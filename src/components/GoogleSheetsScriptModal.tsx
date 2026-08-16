import React, { useState } from 'react';
import { X, Copy, Check, FileSpreadsheet, ExternalLink, Play, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GOOGLE_APPS_SCRIPT_CODE } from '../utils/googleSheetsScript';

interface GoogleSheetsScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
  onSaveWebhookUrl: (url: string) => void;
}

export const GoogleSheetsScriptModal: React.FC<GoogleSheetsScriptModalProps> = ({
  isOpen,
  onClose,
  webhookUrl,
  onSaveWebhookUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [inputUrl, setInputUrl] = useState(webhookUrl);

  React.useEffect(() => {
    if (webhookUrl) {
      setInputUrl(webhookUrl);
    }
  }, [webhookUrl]);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const handleSave = () => {
    if (!inputUrl.trim()) {
      setTestResult({ success: false, message: 'Please enter a valid Google Apps Script Web App URL.' });
      return;
    }
    onSaveWebhookUrl(inputUrl.trim());
    setSaveFeedback('Saved & Synced to Server!');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleTestWebhook = async () => {
    const target = inputUrl.trim();
    if (!target) {
      setTestResult({ success: false, message: 'Please enter your Google Apps Script Web App URL first.' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl: target }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setTestResult({
          success: true,
          message: 'Success! Test order sent and received. Check your Google Sheet now — a new row has appeared!'
        });
        onSaveWebhookUrl(target);
      } else {
        setTestResult({
          success: false,
          message: json.error || 'Failed to reach sheet. Ensure "Who has access" is set to "Anyone" when deploying.'
        });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: 'Network error testing webhook: ' + err.message });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full text-white shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-white">
                Google Sheets Auto-Sync Setup
              </h3>
              <p className="text-xs text-slate-400">
                Automatically log every customer order directly into your Google Sheet
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: Webhook URL Saver */}
          <div className="bg-slate-800/60 border border-emerald-500/30 p-5 rounded-2xl space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400">
              Paste Deployed Google Apps Script Web App URL Here:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSave}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 cursor-pointer"
              >
                Save URL
              </button>
              <button
                onClick={handleTestWebhook}
                disabled={isTesting}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>{isTesting ? 'Testing...' : 'Test Sheet Connection'}</span>
              </button>
            </div>

            {saveFeedback && (
              <div className="p-2.5 rounded-xl text-xs flex items-center gap-2 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{saveFeedback}</span>
              </div>
            )}

            {testResult && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${testResult.success ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' : 'bg-red-950/80 border-red-500/50 text-red-300'}`}>
                {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          {/* Code Copy Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-slate-200">
                Google Apps Script Code (Copy & Paste)
              </h4>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Script Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-300 max-h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
              {GOOGLE_APPS_SCRIPT_CODE}
            </pre>
          </div>

          {/* Step-by-Step Setup Instructions */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-5 rounded-2xl space-y-3">
            <h4 className="font-extrabold text-sm text-amber-300 flex items-center gap-2">
              <span>Step-by-Step Instructions:</span>
            </h4>

            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
              <li>Open a new or existing <strong className="text-white">Google Sheet</strong> (<a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-amber-400 underline inline-flex items-center gap-0.5">sheets.new <ExternalLink className="w-3 h-3" /></a>).</li>
              <li>In the Google Sheet menu bar, click <strong className="text-white">Extensions</strong> → <strong className="text-white">Apps Script</strong>.</li>
              <li>Delete any default code in the editor, then <strong className="text-amber-300">Paste</strong> the script code above.</li>
              <li>Click <strong className="text-white">Deploy</strong> (top right) → <strong className="text-white">New deployment</strong>.</li>
              <li>Select type: <strong className="text-white">Web app</strong>. Set <em>Execute as:</em> <strong>Me</strong>, and <em>Who has access:</em> <strong className="text-amber-300 font-bold">Anyone</strong>.</li>
              <li>Click <strong className="text-white">Deploy</strong>, authorize permissions, copy the generated <strong className="text-emerald-400">Web App URL</strong>, and paste it into the box at the top of this modal!</li>
            </ol>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-800/80 border-t border-slate-700/80 text-right">
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
          >
            Done / Close
          </button>
        </div>

      </div>
    </div>
  );
};
