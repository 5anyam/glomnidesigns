// components/Preloader.tsx
const Preloader = () => {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary" />
      </div>
    )
  }
  export default Preloader;
  