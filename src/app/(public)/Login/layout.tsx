

export default function RootLayout({children}:Readonly<{children: React.ReactNode}>){
    return (
        <>
            <title>Login</title>
            {children}
        </>
    )
}