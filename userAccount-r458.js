{
    const e = self.t
      , t = self.lang;
    let o = null;
    const n = {}.toString().substr(4, 1)
      , c = e.ek(import.meta.url)
      , i = e.tk(c.URL);
    e.p.ik(i + "lang");
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
        e.I0("UserAccountLoginState"))
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
        s.Keo(),
        e.hasOwnProperty("remember") && !e.remember || L(u, l),
        k(),
        "login-ok" === e.type && (await o.jQn(),
        await o.s1n())
    }
    const C = [102, 114].map(e => String.fromCharCode(e)).join("") + n + n;
    async function G() {
        const e = await o.JN();
        O && !e && A(null)
    }
    window.qeo = class extends e.Me {
        constructor() {
            super(),
            e.p.u("user-account"),
            this.Heo = e.qs.lk("div", null, "userAccountWrap"),
            this.Heo.addEventListener("pointerdown", e => this.Neo(e)),
            this.Heo.setAttribute("title", t(".menu-tooltip")),
            this.Heo.setAttribute("role", "button"),
            this.Veo = !1,
            this.Xeo = e.qs.lk("span", this.Heo, "userLicenseType"),
            this.Xeo.setAttribute("mobile-hidden", ""),
            this.Xeo.textContent = t(".free-edition"),
            this.Xeo.style.display = "none",
            this.zeo = e.qs.lk("span", this.Heo, "userAccountName"),
            this.zeo.textContent = t(".waiting"),
            this.wat = e.v(e.qs.kmt, {
                icon: o.oi("account"),
                ariaLabel: t(".user-avatar")
            }, this.Heo),
            this.wat.hk().classList.add("userAccountIcon"),
            d = e.qs.O_.y_(null, o.T_()),
            p = e.qs.O_.y_(null, o.Gk()),
            m = e.qs.O_.y_(null, o.BJt()),
            e.p.j(),
            s = this
        }
        TQn(t, o, n) {
            if (A || L || P)
                throw new Error("security exception");
            e.qd(t),
            e.qd(o),
            e.qd(n),
            A = t,
            L = o,
            P = n,
            e.n0("UserAccountLoginState"),
            e.qs.Ys.$s("Login").ZVn(U)
        }
        dk() {
            o.Ik().Ak().Sk().hk().appendChild(this.Heo)
        }
        Neo(t) {
            if (t.preventDefault(),
            t.stopPropagation(),
            this.Veo)
                return;
            const n = e.v(e.qs.Ek, this.Heo, o.Gk());
            this.Hj(n),
            this.Veo = !0,
            n.n_("bottom-right", 0, 0, "left").then( () => {
                self.setTimeout( () => this.Veo = !1, 50)
            }
            )
        }
        Hj(t) {
            const n = e.p.Ok("user-account.menu");
            r ? t.Pk("account-logout", n(".log-out"), () => this.iWn()) : (t.Pk("account-register", n(".register"), () => this.hAt(), {
                Ck: !0
            }),
            t.Pk("account-login", n(".log-in"), () => this.oAt()),
            o.HVn() && (t.Nk(),
            t.Pk("account-logout", n(".remove-access-code"), () => this.iWn()))),
            o.k_() && (t.Nk(),
            t.Pk("shopping-cart", n(".purchase"), () => o.nAt("UserAccountMenu"), {
                Ck: !0
            }),
            t.Pk("account-access-code", n(".access-code"), () => this.Jeo())),
            t.Nk(),
            t.Pk(this.Nj(), n(".view-details"), () => this.Qeo(), {
                Wj: r
            })
        }
        Qeo() {
            return e.qs.Ys.$s("AccountInfo").Qa(this)
        }
        oAt() {
            e.qs.Ys.$s("Login").Qa()
        }
        Keo() {
            e.p.u("user-account"),
            r ? (this.zeo.textContent = u,
            a ? (this.wat.CA(o.oi("offline")),
            this.wat.y6e(!1)) : (this.wat.CA(d),
            this.wat.y6e(!0))) : (this.zeo.textContent = t(".guest"),
            this.wat.CA(o.oi(w ? "offline" : "account")),
            this.wat.y6e(!1)),
            this.Xeo.style.display = o.k_() ? "" : "none",
            o.w1n(r ? "logged-in-" + o.LWn() : "guest"),
            o.Mgt("updateloginstate"),
            e.p.j()
        }
        async $Vn(t) {
            if (r && t.username === u) {
                f = t["image-blob"];
                try {
                    const n = await e.q1t(f);
                    if (!r || t.username !== u)
                        return;
                    localforage.setItem("last-login-profile-picture", f).catch(e => o.OA(e)),
                    d.so(n),
                    p.so(n),
                    m.so(n)
                } catch (e) {
                    return void console.error("Error decoding profile picture: ", e)
                }
            }
        }
        hAt() {
            o.e_(e.o_.URL.UOn, "RegisterAccount")
        }
        iWn() {
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
            e.qs.Ys.$s("Login").iWn(),
            localforage.removeItem("."),
            localforage.removeItem(","),
            localforage.removeItem("last-login-profile-picture"),
            localforage.removeItem("access-code"),
            y = !1,
            this.Keo()
        }
        async VVn(o) {
            if (w = !1,
            !r)
                if ("server-rejected" === o) {
                    k();
                    const o = e.p.Ok("user-account.saved-login-failed");
                    await e.qs.HY.VYe();
                    const n = e.qs.Ys.$s("Confirm");
                    if (null === await n.Qa({
                        caption: o(".caption"),
                        message: o(".message"),
                        jD: o(".log-in"),
                        vD: t("common.cancel")
                    }))
                        return void this.Keo();
                    this.oAt(),
                    this.Keo()
                } else
                    await this.Yeo(),
                    this.Keo(),
                    k()
        }
        async tWn() {
            console.info("[Account] Login iframe timed out"),
            r || (w = !0,
            await this.Yeo(),
            this.Keo(),
            k())
        }
        async Yeo() {
            const e = await P();
            e && (r = !0,
            a = !0,
            O = !1,
            u = e.username,
            l = e.gZn,
            this.Keo())
        }
        async zVn() {
            w = !1;
            try {
                const e = await localforage.getItem("access-code");
                e && e.code && e.pk ? (v = e.code,
                b = e.pk,
                I = !0,
                this.mZn()) : (this.Keo(),
                k())
            } catch (e) {
                console.warn("Error attempting to read saved access code: ", e),
                this.Keo(),
                k()
            }
        }
        Jeo() {
            if (!e.qs.Ys.$s("Login").eWn()) {
                return void e.qs.Ys.$s("OK").Qa(t("user-account.account-service-unavailable"))
            }
            e.p.u("user-account.access-code-dialog");
            e.qs.Ys.$s("InputCheck").Qa({
                caption: t(".caption"),
                message: t(".message"),
                label: t(".label"),
                lQe: t(".remember"),
                spellcheck: !1
            }).then(e => {
                null !== e && (y = e.check,
                this.Zeo(e.value))
            }
            ),
            e.p.j()
        }
        Zeo(t) {
            e.zt(t),
            v = t,
            b = "",
            e.qs.Ys.$s("Login").sWn(t, null)
        }
        mZn() {
            e.qs.Ys.$s("Login").sWn(v, b)
        }
        async WVn(n) {
            if (o.HVn())
                return void (n.privateKey && (b = n.privateKey,
                y && localforage.setItem("access-code", {
                    code: v,
                    pk: b
                }).catch(e => o.OA(e))));
            o.Lii("Account", "AccessCodeOK");
            const c = n.license;
            c.isAccessCode = !0,
            b = n.privateKey,
            await A(c),
            O = !1,
            this.Keo(),
            I && (y = !0,
            this.Keo(),
            k(),
            I = !1),
            y && localforage.setItem("access-code", {
                code: v,
                pk: b
            }).catch(e => o.OA(e));
            e.qs.Ys.$s("OK").Qa(t("user-account.access-code-ok"))
        }
        KVn(n) {
            if (o.HVn() && "server-rejected" !== n)
                return void console.warn(`[Account] Access code verification failed, but ignoring error '${n}'`);
            let c = !1;
            const i = e.qs.Ys.$s("OK");
            o.HVn() ? (this.iWn(),
            i.Qa(t("user-account.access-code-expired")),
            c = !0) : "server-rejected" === n ? (i.Qa(t("user-account.access-code-rejected")),
            c = !0) : i.Qa(t("user-account.access-code-error")),
            c && (localforage.removeItem("access-code"),
            y = !1),
            I && (this.Keo(),
            k(),
            I = !1)
        }
        FKt() {
            return _
        }
        $j() {
            return r
        }
        E3t() {
            return l
        }
        C3t() {
            return h
        }
        DWn() {
            return a
        }
        P2n() {
            return w
        }
        OWn() {
            return r ? u : t("user-account.guest")
        }
        async eoo() {
            const t = e.sh() + "media/guestProfilePicture.png"
              , o = await e.Kl(t);
            return g = o,
            o
        }
        async BWn() {
            if (f)
                return f;
            if (g)
                return g;
            if (r && a) {
                const e = await localforage.getItem("last-login-profile-picture");
                return e || this.eoo()
            }
            return this.eoo()
        }
        too() {
            return r ? a ? o.oi("offline") : d : w ? o.oi("offline") : o.oi("account")
        }
        Nj() {
            return r ? a ? o.Tk("offline") : p : w ? o.Tk("offline") : o.Tk("account")
        }
        ooo() {
            return r ? a ? o.bds("offline") : m : w ? o.bds("offline") : o.bds("account")
        }
        r1n(e, t, o, n) {
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
    e.fk.addEventListener("load", t => {
        o = t.app,
        o.bk("useraccount", e.v(self.qeo), c)
    }
    ),
    e.fk.addEventListener("afterload", e => {
        o.yk("useraccount").gk().dk()
    }
    )
}
