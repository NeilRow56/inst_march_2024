const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex h-full items-center justify-center bg-slate-100 
          text-center
          dark:bg-slate-800"
    >
      {children}
    </div>
  )
}

export default AuthLayout
