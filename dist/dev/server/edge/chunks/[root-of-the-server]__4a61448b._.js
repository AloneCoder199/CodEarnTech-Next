(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__4a61448b._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Desktop/CodEarn Tech - Next Js/my-app/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/CodEarn Tech - Next Js/my-app/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/CodEarn Tech - Next Js/my-app/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/CodEarn Tech - Next Js/my-app/node_modules/jose/dist/webapi/jwt/verify.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/CodEarn Tech - Next Js/my-app/node_modules/jose/dist/webapi/jwt/sign.js [middleware-edge] (ecmascript)");
;
;
const SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);
async function verifyToken(token, secret) {
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret);
        return payload;
    } catch  {
        return null;
    }
}
async function refreshAccessToken(refreshToken) {
    const payload = await verifyToken(refreshToken, REFRESH_SECRET);
    if (!payload) return null;
    return await new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SignJWT"]({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        sessionId: payload.sessionId
    }).setProtectedHeader({
        alg: 'HS256',
        typ: 'JWT'
    }).setExpirationTime('1h').sign(SECRET);
}
async function middleware(request) {
    const { pathname } = request.nextUrl;
    let accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    let payload = null;
    let response = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    if (accessToken) {
        payload = await verifyToken(accessToken, SECRET);
    }
    // Token refresh logic agar access token expired hai
    if (!payload && refreshToken) {
        const newToken = await refreshAccessToken(refreshToken);
        if (newToken) {
            payload = await verifyToken(newToken, SECRET);
            // Naya response object banayein taake cookie set ho sake
            response = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
            response.cookies.set('accessToken', newToken, {
                httpOnly: true,
                secure: ("TURBOPACK compile-time value", "development") === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 3600
            });
        }
    }
    // 1. Enroll route protection (Special Case)
    if (pathname.startsWith('/enroll/')) {
        if (!payload) {
            const courseSlug = pathname.split('/')[2];
            const url = new URL('/register', request.url);
            url.searchParams.set('redirect', `/enroll/${courseSlug}`);
            url.searchParams.set('course', courseSlug);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
        }
    }
    // 2. Guest Routes (Login/Register)
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (payload) {
            const dashboard = payload.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(dashboard, request.url));
        }
        return response;
    }
    // 3. Protected Routes (Admin/Student)
    if (!payload) {
        if (pathname.startsWith('/admin') || pathname.startsWith('/student')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
        }
    } else {
        const role = payload.role;
        if (pathname.startsWith('/admin') && role !== 'admin') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/student/dashboard?error=unauthorized', request.url));
        }
        if (pathname.startsWith('/student') && role !== 'student') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$CodEarn__Tech__$2d$__Next__Js$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/admin/dashboard?error=unauthorized', request.url));
        }
    }
    return response;
}
const config = {
    matcher: [
        '/admin/:path*',
        '/student/:path*',
        '/login',
        '/register',
        '/enroll/:path*'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__4a61448b._.js.map