export default function RootLayout({
    children,
}: Readonly<{
    children:React.ReactNode;
}>){
    return(
        <main className="bg-gradient-to-r from-pink-800 to-amber-500">
            {children}
        </main>
    )
}