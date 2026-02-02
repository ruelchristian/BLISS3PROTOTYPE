import React, { useState, useRef } from 'react';
import { User } from '../../types';
import { Camera, Image as ImageIcon, Send, Loader2, Sparkles, X, PlusCircle } from 'lucide-react';
import { analyzeImage } from '../../services/geminiService';

const SubmitRequest: React.FC<{ user: User }> = ({ user }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('MAINTENANCE');
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIScan = async () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    try {
      const base64Data = imagePreview.split(',')[1];
      const result = await analyzeImage(base64Data, 'What is the issue in this image? Provide a short title and detailed description for a maintenance request.');
      
      const lines = result?.split('\n') || [];
      if (lines.length > 0) {
        setTitle(lines[0].replace(/Title:?\s*/i, '').trim());
        setDescription(result || '');
      }
    } catch (error) {
      console.error('AI Analysis failed', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Request submitted successfully!');
    setTitle('');
    setDescription('');
    setImagePreview(null);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <PlusCircle className="w-6 h-6 text-[#0068B6]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#003067]">Request Service</h2>
            <p className="text-gray-500 font-medium">Need something fixed? Let us know.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-black uppercase tracking-tight">Category</label>
              <select 
                className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="MAINTENANCE">Maintenance</option>
                <option value="SECURITY">Security</option>
                <option value="UTILITIES">Utilities</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-black uppercase tracking-tight">Urgency</label>
              <select className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6]">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High / Urgent</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-black uppercase tracking-tight">Short Title</label>
            <input 
              type="text"
              required
              className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6] transition-all placeholder:text-gray-400"
              placeholder="e.g. Broken streetlight"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-black uppercase tracking-tight">Detailed Description</label>
            <textarea 
              rows={4}
              required
              className="w-full px-4 py-3 bg-gray-50 text-black font-semibold border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0068B6] transition-all placeholder:text-gray-400"
              placeholder="Please provide details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-black uppercase tracking-tight">Attach Photos</label>
            {!imagePreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[#0068B6]/30 transition-all"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-bold text-black">Click to upload or take a photo</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border">
                <img src={imagePreview} alt="Preview" className="w-full aspect-video object-cover" />
                <button 
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white shadow-sm"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <button
                    type="button"
                    onClick={handleAIScan}
                    disabled={isAnalyzing}
                    className="w-full bg-[#0068B6]/90 backdrop-blur text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#0068B6] transition-all shadow-lg"
                  >
                    {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {isAnalyzing ? "Analyzing..." : "AI Auto-fill from photo"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0068B6] hover:bg-[#003067] text-white font-bold py-4 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Send className="w-5 h-5" />
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitRequest;