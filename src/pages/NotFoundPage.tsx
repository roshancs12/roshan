import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="grid min-h-screen place-items-center bg-slate-950 text-white">
    <div className="text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-slate-300">Page not found</p>
      <Link to="/" className="mt-4 inline-block text-ai-300">Back home</Link>
    </div>
  </div>
);
