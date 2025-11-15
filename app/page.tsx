'use client';

import { useAudioRecorder } from './hooks/useAudioRecorder';
import { getUrgencyColor, getUrgencyBadge, getUrgencyEmoji, formatTime } from './utils/urgency';

export default function Home() {
  const {
    isRecording,
    recordingTime,
    audioBlob,
    isProcessing,
    explanation,
    error,
    handleRecordClick,
    handleExplain,
    handleDownload,
    handleNewRecording,
  } = useAudioRecorder();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-3">Talky</h1>
          <p className="text-gray-600 text-lg md:text-xl">Rompe la desigualdad desinformativa</p>
          <p className="text-gray-500 text-sm md:text-base mt-2">Convierte tu voz en explicaciones claras con IA</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Recording Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            {/* Mic Icon */}
            <div className="flex justify-center mb-8">
              <div
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50'
                    : explanation
                    ? 'bg-green-500 shadow-lg shadow-green-500/50'
                    : 'bg-blue-600 shadow-lg shadow-blue-600/50'
                }`}
              >
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                  <path d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
                </svg>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-700 text-sm font-semibold">⚠️ {error}</p>
              </div>
            )}

            {/* Status Text */}
            {!explanation && (
              <div className="text-center mb-8">
                <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2">Estado</p>
                <p className={`text-3xl font-bold ${isRecording ? 'text-red-500' : 'text-gray-900'}`}>
                  {isRecording ? 'Grabando...' : audioBlob ? 'Audio listo' : 'Listo para grabar'}
                </p>
              </div>
            )}

            {/* Recording Time */}
            {isRecording && (
              <div className="text-center mb-8">
                <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2">
                  Tiempo de grabación
                </p>
                <p className="text-4xl font-mono font-bold text-blue-600">{formatTime(recordingTime)}</p>
              </div>
            )}

            {/* Waveform Animation */}
            {isRecording && (
              <div className="flex items-center justify-center gap-1 mb-10 h-16">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-blue-600 rounded-full w-1.5"
                    style={{
                      height: `${Math.random() * 50 + 15}px`,
                      animation: `pulse 0.6s ease-in-out ${i * 0.05}s infinite`,
                    }}
                  ></div>
                ))}
              </div>
            )}

            {/* Record Button */}
            {!explanation && (
              <button
                onClick={handleRecordClick}
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 mb-3 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg disabled:bg-gray-400'
                }`}
              >
                {isRecording ? (
                  <>
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    Detener grabación
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                      <path d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
                    </svg>
                    Grabar
                  </>
                )}
              </button>
            )}

            {/* Explain Button */}
            {audioBlob && !explanation && (
              <button
                onClick={() => handleExplain('TI')}
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 mb-3 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 shadow-lg'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    Procesando con IA...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"></path>
                    </svg>
                    Explicar con IA
                  </>
                )}
              </button>
            )}

            {/* Download Button */}
            {audioBlob && !explanation && (
              <button
                onClick={handleDownload}
                className="w-full py-3 rounded-xl font-bold text-blue-600 border-2 border-blue-600 bg-white hover:bg-blue-50 transition-all duration-300"
              >
                📥 Descargar WEBM
              </button>
            )}

            {/* New Recording Button */}
            {explanation && (
              <button
                onClick={handleNewRecording}
                className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg"
              >
                Nueva grabación
              </button>
            )}
          </div>

          {/* Right: Explanation Card or Info */}
          {explanation ? (
            <div className={`border-2 rounded-2xl p-8 ${getUrgencyColor(explanation.nivel_urgencia)}`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Explicación</h2>
                <span
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${getUrgencyBadge(
                    explanation.nivel_urgencia
                  )}`}
                >
                  {getUrgencyEmoji(explanation.nivel_urgencia)} {explanation.nivel_urgencia}
                </span>
              </div>

              {/* Transcribed Text */}
              <div className="mb-6">
                <p className="text-xs uppercase font-semibold text-gray-700 mb-3">📝 Texto transcrito:</p>
                <p className="text-gray-700 text-sm bg-white bg-opacity-50 p-4 rounded-lg leading-relaxed">
                  "{explanation.texto_transcrito}"
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 border-opacity-30 my-6"></div>

              {/* Explanation */}
              <div className="mb-6">
                <p className="text-xs uppercase font-semibold text-gray-700 mb-3">💡 Explicación clara:</p>
                <p className="text-gray-800 text-base leading-relaxed bg-white bg-opacity-30 p-4 rounded-lg">
                  {explanation.explicacion_clara}
                </p>
              </div>

              {/* Actions */}
              <div className="bg-white bg-opacity-40 rounded-lg p-4">
                <p className="text-xs uppercase font-semibold text-gray-700 mb-3">✅ Acciones sugeridas:</p>
                <ul className="space-y-2">
                  {explanation.acciones_sugeridas.map((accion, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-700">
                      <span className="font-bold text-blue-600 flex-shrink-0">{idx + 1}.</span>
                      <span>{accion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col justify-center">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">¿Cómo funciona?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Graba tu consulta técnica, la IA la analiza y te proporciona una explicación clara y
                    comprensible en lenguaje simple.
                  </p>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🎙️</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 text-sm">Graba tu pregunta</p>
                      <p className="text-gray-600 text-xs">Usa el micrófono para tu consulta técnica</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧠</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 text-sm">Procesa con IA</p>
                      <p className="text-gray-600 text-xs">Análisis inteligente de tu pregunta</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📖</span>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 text-sm">Obtén explicación</p>
                      <p className="text-gray-600 text-xs">Respuesta clara y accionable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            💡 Grabar → Procesar con IA → Obtener explicación clara
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}