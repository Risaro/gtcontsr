{
    const e = self.t,
        t = self.lang;
    let o = null;
    const n = {}.toString().substr(4, 1),
        c = e.sj(import.meta.url),
        i = e.nj(c.URL);
    e.u.ij(i + "lang");
    let s = null,
        r = !1,
        a = !1,
        u = "",
        l = 0,
        h = "",
        f = null,
        g = null,
        d = null,
        p = null,
        m = null,
        w = !1,
        A = null,
        L = null,
        P = null,
        v = "",
        b = "",
        y = !1,
        I = !1,
        O = false,
        S = null;
    const _ = new Promise(e => {
        S = e
    });

    function k() {
        S && (S(), S = null, e.dq("UserAccountLoginState"))
    }
    async function U(e) {
        if ("login-ok" !== e.type && "auto-login-ok" !== e.type) return;
        r = !0, a = !1, u = e.username, l = e.userId, h = e.token || "";
        const t = e.license;
        await A(t), O = false, w = !1, s.Keo(), e.hasOwnProperty("remember") && !e.remember || L(u, l), k(), "login-ok" === e.type && (await o.g0n(), await o.k1n())
    }
    const C = [102, 114].map(e => String.fromCharCode(e)).join("") + n + n;
    async function G() {
        O = false;
        const e = await o.iD();
        O && !e && A(null);
        O = false
    }
    window.qeo = class extends e.MV {
        constructor() {
            super(), e.u.o("user-account"), this.Heo = e.ti.gj("div", null, "userAccountWrap"), this.Heo.addEventListener("pointerdown", e => this.Neo(e)), this.Heo.setAttribute("title", t(".menu-tooltip")), this.Heo.setAttribute("role", "button"), this.Veo = !1, this.Xeo = e.ti.gj("span", this.Heo, "userLicenseType"), this.Xeo.setAttribute("mobile-hidden", ""), this.Xeo.textContent = "Personal", this.Xeo.style.display = "none", this.zeo = e.ti.gj("span", this.Heo, "userAccountName"), this.zeo.textContent = t(".waiting"), this.iut = e.m(e.ti.met, {
                icon: o.ht("account"),
                ariaLabel: t(".user-avatar")
            }, this.Heo), this.iut.FO().classList.add("userAccountIcon"), d = e.ti.zrt.mF(null, o.Ent()), p = e.ti.zrt.mF(null, o.bet()), m = e.ti.zrt.mF(null, o.IMt()), e.u.it(), s = this
        }
        s0n(t, o, n) {
            if (A || L || P) throw new Error("security exception");
            e.yp(t), e.yp(o), e.yp(n), A = t, L = o, P = n, e.ZJ("UserAccountLoginState"), e.ti.Ze.Ke("Login").IWn(U)
        }
        aue() {
            o.wue().art().UW().FO().appendChild(this.Heo)
        }
        Neo(t) {
            if (t.preventDefault(), t.stopPropagation(), this.Veo) return;
            const n = e.m(e.ti.LO, this.Heo, o.bet());
            this.$ue(n), this.Veo = !0, n.Yue("bottom-right", 0, 0, "left").then(() => {
                self.setTimeout(() => this.Veo = !1, 50)
            })
        }
        $ue(t) {
            const n = e.u.z_("user-account.menu");
            r ? t.xO("account-logout", n(".log-out"), () => this.AWn()) : (t.xO("account-register", n(".register"), () => this.ODt(), {
                GO: !0
            }), t.xO("account-login", n(".log-in"), () => this.TDt()), o.xWn() && (t.YO(), t.xO("account-logout", n(".remove-access-code"), () => this.AWn()))), o.XB() && (t.YO(), t.xO("shopping-cart", n(".purchase"), () => o.IDt("UserAccountMenu"), {
                GO: !0
            }), t.xO("account-access-code", n(".access-code"), () => this.Jeo())), t.YO(), t.xO(this.Nue(), n(".view-details"), () => this.Qeo(), {
                Wue: r
            })
        }
        Qeo() {
            return e.ti.Ze.Ke("AccountInfo").pr(this)
        }
        TDt() {
            e.ti.Ze.Ke("Login").pr()
        }
        Keo() {
            e.u.o("user-account"), r ? (this.zeo.textContent = u, a ? (this.iut.zD(o.ht("offline")), this.iut.q6e(!1)) : (this.iut.zD(d), this.iut.q6e(!0))) : (this.zeo.textContent = t(".guest"), this.iut.zD(o.ht(w ? "offline" : "account")), this.iut.q6e(!1)), this.Xeo.style.display = o.XB() ? "" : "none", o.H1n(r ? "logged-in-" + o.fHn() : "guest"), o.Yrt("updateloginstate"), e.u.it()
        }
        async yWn(t) {
            if (r && t.username === u) {
                f = t["image-blob"];
                try {
                    const n = await e.xNt(f);
                    if (!r || t.username !== u) return;
                    localforage.setItem("last-login-profile-picture", f).catch(e => o.cme(e)), d.gl(n), p.gl(n), m.gl(n)
                } catch (e) {
                    return void console.error("Error decoding profile picture: ", e)
                }
            }
        }
        ODt() {
            o.SN(e.ON.URL.mDn, "RegisterAccount")
        }
        AWn() {
            r = !1, a = !1, u = "", l = 0, h = "", f = null, v = "", b = "", A(null), O = false, e.ti.Ze.Ke("Login").AWn(), localforage.removeItem("."), localforage.removeItem(","), localforage.removeItem("last-login-profile-picture"), localforage.removeItem("access-code"), y = !1, this.Keo()
        }
        async vWn(o) {
            if (w = !1, !r)
                if ("server-rejected" === o) {
                    k();
                    const o = e.u.z_("user-account.saved-login-failed");
                    await e.ti.SK.vJe();
                    const n = e.ti.Ze.Ke("Confirm");
                    if (null === await n.pr({
                            caption: o(".caption"),
                            message: o(".message"),
                            jT: o(".log-in"),
                            vT: t("common.cancel")
                        })) return void this.Keo();
                    this.TDt(), this.Keo()
                } else await this.Yeo(), this.Keo(), k()
        }
        async GWn() {
            console.info("[Account] Login iframe timed out"), r || (w = !0, await this.Yeo(), this.Keo(), k())
        }
        async Yeo() {
            const e = await P();
            e && (r = !0, a = !0, O = false, u = e.username, l = e.KZn, this.Keo())
        }
        async bWn() {
            w = !1;
            try {
                const e = await localforage.getItem("access-code");
                e && e.code && e.pk ? (v = e.code, b = e.pk, I = !0, this.WZn()) : (this.Keo(), k())
            } catch (e) {
                console.warn("Error attempting to read saved access code: ", e), this.Keo(), k()
            }
        }
        Jeo() {
            if (!e.ti.Ze.Ke("Login").RWn()) {
                return void e.ti.Ze.Ke("OK").pr(t("user-account.account-service-unavailable"))
            }
            e.u.o("user-account.access-code-dialog");
            e.ti.Ze.Ke("InputCheck").pr({
                caption: t(".caption"),
                message: t(".message"),
                label: t(".label"),
                UQe: t(".remember"),
                spellcheck: !1
            }).then(e => {
                null !== e && (y = e.check, this.Zeo(e.value))
            }), e.u.it()
        }
        Zeo(t) {
            e.vu(t), v = t, b = "", e.ti.Ze.Ke("Login").kWn(t, null)
        }
        WZn() {
            e.ti.Ze.Ke("Login").kWn(v, b)
        }
        async SWn(n) {
            if (o.xWn()) return void(n.privateKey && (b = n.privateKey, y && localforage.setItem("access-code", {
                code: v,
                pk: b
            }).catch(e => o.cme(e))));
            o.P7s("Account", "AccessCodeOK");
            const c = n.license;
            c.isAccessCode = !0, b = n.privateKey, await A(c), O = false, this.Keo(), I && (y = !0, this.Keo(), k(), I = !1), y && localforage.setItem("access-code", {
                code: v,
                pk: b
            }).catch(e => o.cme(e));
            e.ti.Ze.Ke("OK").pr(t("user-account.access-code-ok"))
        }
        MWn(n) {
            if (o.xWn() && "server-rejected" !== n) return void console.warn(`[Account] Access code verification failed, but ignoring error '${n}'`);
            let c = !1;
            const i = e.ti.Ze.Ke("OK");
            o.xWn() ? (this.AWn(), i.pr(t("user-account.access-code-expired")), c = !0) : "server-rejected" === n ? (i.pr(t("user-account.access-code-rejected")), c = !0) : i.pr(t("user-account.access-code-error")), c && (localforage.removeItem("access-code"), y = !1), I && (this.Keo(), k(), I = !1)
        }
        bst() {
            return _
        }
        BDt() {
            return r
        }
        OVt() {
            return l
        }
        FVt() {
            return h
        }
        cHn() {
            return a
        }
        q2n() {
            return w
        }
        uHn() {
            return r ? u : t("user-account.guest")
        }
        async eoo() {
            const t = e.xa() + "media/guestProfilePicture.png",
                o = await e.ma(t);
            return g = o, o
        }
        async pHn() {
            if (f) return f;
            if (g) return g;
            if (r && a) {
                const e = await localforage.getItem("last-login-profile-picture");
                return e || this.eoo()
            }
            return this.eoo()
        }
        too() {
            return r ? a ? o.ht("offline") : d : w ? o.ht("offline") : o.ht("account")
        }
        Nue() {
            return r ? a ? o.krt("offline") : p : w ? o.krt("offline") : o.krt("account")
        }
        ooo() {
            return r ? a ? o.lcs("offline") : m : w ? o.lcs("offline") : o.lcs("account")
        }
        D1n(e, t, o, n) {
            const c = new URLSearchParams;
            o ? (c.append("accessCode", v), c.append("privateKey", b)) : (c.append("userID", l), c.append("token", h)), c.append("filename", t);
            const i = new URL(location.origin + "/sharedprojects/share.json");
            return i.search = c.toString(), new Promise((t, o) => {
                const c = e => o({
                        responseCode: e
                    }),
                    s = new XMLHttpRequest;
                s.open("POST", i.toString()), s.responseType = "json", s.upload.onprogress = t => n(t.loaded / e.size), s.onload = e => t(s.response), s.onerror = () => c("connection error"), s.onabort = () => c("connection aborted"), s.ontimeout = () => c("connection timeout"), s.upload.onerror = () => c("connection error"), s.upload.onabort = () => c("connection aborted"), s.upload.ontimeout = () => c("connection timeout"), s.send(e)
            })
        }
    }, window.C3_IsPopupWindow || setInterval(G, 43179), e.vF.addEventListener("load", t => {
        o = t.app, o.Nq("useraccount", e.m(self.qeo), c)
    }), e.vF.addEventListener("afterload", e => {
        o.gst("useraccount").WZ().aue()
    })
}