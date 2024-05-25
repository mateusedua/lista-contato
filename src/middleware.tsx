import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const path = request.nextUrl.pathname

    if (token === undefined && (path !== "/Login" && path !== "/Cadastro")) {
        return NextResponse.redirect(new URL("/Login", request.url))
    }

    if (token !== undefined) {
        const result = await fetch(`${process.env.API_URL}api/user/auth`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token?.value}`
            }
        })

        if (result.status === 401 && (path !== "/Login" && path !== "/Cadastro")) {
            return NextResponse.redirect(new URL("/Login", request.url))
        }

        if (result.status === 200 && (path == "/Login" || path === "/Cadastro")) {
            return NextResponse.redirect(new URL("/", request.url))
        }

    }
}


export const config = {
    matcher: [
        "/",
        "/Login",
        "/Cadastro",
        "/Contato"
    ]
}