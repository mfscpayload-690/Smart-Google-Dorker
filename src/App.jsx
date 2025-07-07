import MatrixBackground from './components/MatrixBackground';
import DorkForm from './components/DorkForm';

export default function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MatrixBackground />
      <div className="relative z-10 w-full max-w-xl p-8 bg-cyberbg bg-opacity-80 rounded-xl shadow-2xl border-2 border-matrix">
        <h1 className="text-4xl md:text-5xl font-orbitron text-matrix text-center mb-6 tracking-widest drop-shadow-lg">
          Smart Google Dorker
        </h1>
        <DorkForm />
      </div>
    </div>
  );
} 