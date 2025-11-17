{
    const e = self.t
      , t = self.lang;
    let o = null;
    const n = {}.toString().substr(4, 1)
      , c = e.bW(import.meta.url)
      , i = e.IW(c.URL);
    e.p.MW(i + "lang");
    let s = null
      , r = !1
      , a = !1
      , u = ""
      , l = 0
      , h = ""
      , f = null
      , g = null
      , d = null
      , p = null
      , m = null
      , w = !1
      , A = null
      , L = null
      , P = null
      , v = ""
      , b = ""
      , y = !1
      , I = !1
      , O = !0
      , S = null;
    const _ = new Promise(e => {
        S = e
    }
    );
    function k() {
        S && (S(),
        S = null,
        e.OU("UserAccountLoginState"))
    }
    async function U(e) {
        if ("login-ok" !== e.type && "auto-login-ok" !== e.type)
            return;
        r = !0,
        a = !1,
        u = e.username,
        l = e.userId,
        h = e.token || "";
        const t = e.license;
        await A(t),
        O = !t || t.type === C,
        w = false,
        s.eoo(),
        e.hasOwnProperty("remember") && !e.remember || L(u, l),
        k(),
        "login-ok" === e.type && (await o.FZe(),
        await o.H0e())
    }
    const C = [102, 114].map(e => String.fromCharCode(e)).join("") + n + n;
    async function G() {
        const e = await o.$T();
        O && !e && A(null)
    }
    window.too = class extends e.Me {
        constructor() {
            super(),
            e.p.u("user-account"),
            this.ooo = e.Qs.W_("div", null, "userAccountWrap"),
            this.ooo.addEventListener("pointerdown", e => this.noo(e)),
            this.ooo.setAttribute("title", t(".menu-tooltip")),
            this.ooo.setAttribute("role", "button"),
            this.coo = !1,
            this.ioo = e.Qs.W_("span", this.ooo, "userLicenseType"),
            this.ioo.setAttribute("mobile-hidden", ""),
            this.ioo.textContent = t(".free-edition"),
            this.ioo.style.display = "none",
            this.soo = e.Qs.W_("span", this.ooo, "userAccountName"),
            this.soo.textContent = t(".waiting"),
            this.BGt = e.v(e.Qs._q, {
                icon: o.oi("account"),
                ariaLabel: t(".user-avatar")
            }, this.ooo),
            this.BGt.k_().classList.add("userAccountIcon"),
            d = e.Qs.d0.hP(null, o.m4()),
            p = e.Qs.d0.hP(null, o.Oq()),
            m = e.Qs.d0.hP(null, o.s8()),
            e.p.j(),
            s = this
        }
        bZe(t, o, n) {
            if (A || L || P)
                throw new Error("security exception");
            e.nu(t),
            e.nu(o),
            e.nu(n),
            A = t,
            L = o,
            P = n,
            e.lU("UserAccountLoginState"),
            e.Qs.Ks.qs("Login").K$e(U)
        }
        Due() {
            o.Kue().jQ().fP().k_().appendChild(this.ooo)
        }
        noo(t) {
            if (t.preventDefault(),
            t.stopPropagation(),
            this.coo)
                return;
            const n = e.v(e.Qs.EA, this.ooo, o.Oq());
            this.Ome(n),
            this.coo = !0,
            n.Jlt("bottom-right", 0, 0, "left").then( () => {
                self.setTimeout( () => this.coo = !1, 50)
            }
            )
        }
        Ome(t) {
            const n = e.p.Yue("user-account.menu");
            r ? t._A("account-logout", n(".log-out"), () => this.Y$e()) : (t._A("account-register", n(".register"), () => this.a3t(), {
                MT: !0
            }),
            t._A("account-login", n(".log-in"), () => this.c3t()),
            o.j$e() && (t.YA(),
            t._A("account-logout", n(".remove-access-code"), () => this.Y$e()))),
            o.CP() && (t.YA(),
            t._A("shopping-cart", n(".purchase"), () => o.r3t("UserAccountMenu"), {
                MT: !0
            }),
            t._A("account-access-code", n(".access-code"), () => this.roo())),
            t.YA(),
            t._A(this.Cme(), n(".view-details"), () => this.aoo(), {
                Eme: r
            })
        }
        aoo() {
            return e.Qs.Ks.qs("AccountInfo").Xa(this)
        }
        c3t() {
            e.Qs.Ks.qs("Login").Xa()
        }
        eoo() {
            e.p.u("user-account"),
            r ? (this.soo.textContent = u,
            a ? (this.BGt.m0(o.oi("offline")),
            this.BGt.Qki(!1)) : (this.BGt.m0(d),
            this.BGt.Qki(!0))) : (this.soo.textContent = t(".guest"),
            this.BGt.m0(o.oi(w ? "offline" : "account")),
            this.BGt.Qki(!1)),
            this.ioo.style.display = o.CP() ? "" : "none",
            o.Z1e(r ? "logged-in-" + o.Oze() : "guest"),
            o.y0("updateloginstate"),
            e.p.j()
        }
        async L$e(t) {
            if (r && t.username === u) {
                f = t["image-blob"];
                try {
                    const n = await e.b4(f);
                    if (!r || t.username !== u)
                        return;
                    localforage.setItem("last-login-profile-picture", f).catch(e => o._we(e)),
                    d.PF(n),
                    p.PF(n),
                    m.PF(n)
                } catch (e) {
                    return void console.error("Error decoding profile picture: ", e)
                }
            }
        }
        a3t() {
            o.pQ(e.dQ.URL.HIe, "RegisterAccount")
        }
        Y$e() {
            r = !1,
            a = !1,
            u = "",
            l = 0,
            h = "",
            f = null,
            v = "",
            b = "",
            A(null),
            O = !0,
            e.Qs.Ks.qs("Login").Y$e(),
            localforage.removeItem("."),
            localforage.removeItem(","),
            localforage.removeItem("last-login-profile-picture"),
            localforage.removeItem("access-code"),
            y = !1,
            this.eoo()
        }
        async U$e(o) {
            if (w = !1,
            !r)
                if ("server-rejected" === o) {
                    k();
                    const o = e.p.Yue("user-account.saved-login-failed");
                    await e.Qs.mk.kMi();
                    const n = e.Qs.Ks.qs("Confirm");
                    if (null === await n.Xa({
                        caption: o(".caption"),
                        message: o(".message"),
                        _nt: o(".log-in"),
                        bnt: t("common.cancel")
                    }))
                        return void this.eoo();
                    this.c3t(),
                    this.eoo()
                } else
                    await this.uoo(),
                    this.eoo(),
                    k()
        }
        async X$e() {
            console.info("[Account] Login iframe timed out"),
            r || (w = !0,
            await this.uoo(),
            this.eoo(),
            k())
        }
        async uoo() {
            const e = await P();
            e && (r = !0,
            a = !0,
            O = !1,
            u = e.username,
            l = e.hJe,
            this.eoo())
        }
        async B$e() {
            w = !1;
            try {
                const e = await localforage.getItem("access-code");
                e && e.code && e.pk ? (v = e.code,
                b = e.pk,
                I = !0,
                this.nJe()) : (this.eoo(),
                k())
            } catch (e) {
                console.warn("Error attempting to read saved access code: ", e),
                this.eoo(),
                k()
            }
        }
        roo() {
            if (!e.Qs.Ks.qs("Login").J$e()) {
                return void e.Qs.Ks.qs("OK").Xa(t("user-account.account-service-unavailable"))
            }
            e.p.u("user-account.access-code-dialog");
            e.Qs.Ks.qs("InputCheck").Xa({
                caption: t(".caption"),
                message: t(".message"),
                label: t(".label"),
                x_i: t(".remember"),
                spellcheck: !1
            }).then(e => {
                null !== e && (y = e.check,
                this.loo(e.value))
            }
            ),
            e.p.j()
        }
        loo(t) {
            e.zt(t),
            v = t,
            b = "",
            e.Qs.Ks.qs("Login").Z$e(t, null)
        }
        nJe() {
            e.Qs.Ks.qs("Login").Z$e(v, b)
        }
        async N$e(n) {
            if (o.j$e())
                return void (n.privateKey && (b = n.privateKey,
                y && localforage.setItem("access-code", {
                    code: v,
                    pk: b
                }).catch(e => o._we(e))));
            o.XGi("Account", "AccessCodeOK");
            const c = n.license;
            c.isAccessCode = !0,
            b = n.privateKey,
            await A(c),
            O = !1,
            this.eoo(),
            I && (y = !0,
            this.eoo(),
            k(),
            I = !1),
            y && localforage.setItem("access-code", {
                code: v,
                pk: b
            }).catch(e => o._we(e));
            e.Qs.Ks.qs("OK").Xa(t("user-account.access-code-ok"))
        }
        $$e(n) {
            if (o.j$e() && "server-rejected" !== n)
                return void console.warn(`[Account] Access code verification failed, but ignoring error '${n}'`);
            let c = !1;
            const i = e.Qs.Ks.qs("OK");
            o.j$e() ? (this.Y$e(),
            i.Xa(t("user-account.access-code-expired")),
            c = !0) : "server-rejected" === n ? (i.Xa(t("user-account.access-code-rejected")),
            c = !0) : i.Xa(t("user-account.access-code-error")),
            c && (localforage.removeItem("access-code"),
            y = !1),
            I && (this.eoo(),
            k(),
            I = !1)
        }
        pq() {
            return _
        }
        Gme() {
            return r
        }
        Mst() {
            return l
        }
        kst() {
            return h
        }
        Aze() {
            return a
        }
        EQn() {
            return w
        }
        Gze() {
            return r ? u : t("user-account.guest")
        }
        async hoo() {
            const t = e.Vgt() + "media/guestProfilePicture.png"
              , o = await e._4(t);
            return g = o,
            o
        }
        async Dze() {
            if (f)
                return f;
            if (g)
                return g;
            if (r && a) {
                const e = await localforage.getItem("last-login-profile-picture");
                return e || this.hoo()
            }
            return this.hoo()
        }
        foo() {
            return r ? a ? o.oi("offline") : d : w ? o.oi("offline") : o.oi("account")
        }
        Cme() {
            return r ? a ? o.u0("offline") : p : w ? o.u0("offline") : o.u0("account")
        }
        goo() {
            return r ? a ? o.s1i("offline") : m : w ? o.s1i("offline") : o.s1i("account")
        }
        q0e(e, t, o, n) {
            const c = new URLSearchParams;
            o ? (c.append("accessCode", v),
            c.append("privateKey", b)) : (c.append("userID", l),
            c.append("token", h)),
            c.append("filename", t);
            const i = new URL(location.origin + "/sharedprojects/share.json");
            return i.search = c.toString(),
            new Promise( (t, o) => {
                const c = e => o({
                    responseCode: e
                })
                  , s = new XMLHttpRequest;
                s.open("POST", i.toString()),
                s.responseType = "json",
                s.upload.onprogress = t => n(t.loaded / e.size),
                s.onload = e => t(s.response),
                s.onerror = () => c("connection error"),
                s.onabort = () => c("connection aborted"),
                s.ontimeout = () => c("connection timeout"),
                s.upload.onerror = () => c("connection error"),
                s.upload.onabort = () => c("connection aborted"),
                s.upload.ontimeout = () => c("connection timeout"),
                s.send(e)
            }
            )
        }
    }
    ,
    window.C3_IsPopupWindow || setInterval(G, 43179),
    e.sF.addEventListener("load", t => {
        o = t.app,
        o.hF("useraccount", e.v(self.too), c)
    }
    ),
    e.sF.addEventListener("afterload", e => {
        o.L1("useraccount").ez().Due()
    }
    )
}
