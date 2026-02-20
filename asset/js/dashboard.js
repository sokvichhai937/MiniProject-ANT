
    // ===== Auth guard =====
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "../index.html";

    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const articleToggle = document.getElementById("articleToggle");
    const articleSub = document.getElementById("articleSub");
    const pageTitle = document.getElementById("pageTitle");

    const pages = ["dashboard", "all", "create", "category", "profile"];

    const titles = {
      dashboard: "Overview",
      all: "All Articles",
      create: "Create Article",
      category: "Categories",
      profile: "Profile",
    };

    // Sidebar Toggle
    menuToggle.addEventListener("click", () => {
      if (window.innerWidth > 991) sidebar.classList.toggle("collapsed");
      else sidebar.classList.toggle("mobile-show");
    });

    // Sub-menu Toggle
    articleToggle.addEventListener("click", (e) => {
      e.preventDefault();
      if (sidebar.classList.contains("collapsed")) sidebar.classList.remove("collapsed");
      const isOpen = articleSub.classList.toggle("open");
      articleToggle.querySelector(".chevron").style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
    });

    function showPage(key) {
      // show/hide page
      pages.forEach(p => {
        document.getElementById("page-" + p).classList.toggle("show", p === key);
      });

      // title
      pageTitle.textContent = titles[key] || "Overview";

      // active state
      document.querySelectorAll(".nav-itemx, .nav-sub a").forEach(el => el.classList.remove("active"));

      // set active for main or sub
      const main = document.querySelector(`.nav-itemx[data-nav="${key}"]`);
      const sub = document.querySelector(`.nav-sub a[data-nav="${key}"]`);

      if (main) {
        main.classList.add("active");
        // close submenu if click non-article page
        if (key !== "all" && key !== "create") {
          articleSub.classList.remove("open");
          articleToggle.querySelector(".chevron").style.transform = "rotate(0deg)";
        }
      }

      if (sub) {
        sub.classList.add("active");
        // keep submenu open + highlight My Articles
        articleSub.classList.add("open");
        articleToggle.classList.add("active");
        articleToggle.querySelector(".chevron").style.transform = "rotate(180deg)";
      }

      // save current page
      localStorage.setItem("activePage", key);

      // close mobile sidebar after click
      if (window.innerWidth <= 991) sidebar.classList.remove("mobile-show");
    }

    // click navigation (sidebar + dropdown)
    document.addEventListener("click", (e) => {
      const nav = e.target.closest("[data-nav]");
      if (!nav) return;
      e.preventDefault();
      const key = nav.getAttribute("data-nav");
      if (!pages.includes(key)) return;
      showPage(key);
    });

    // quick buttons
    document.getElementById("goCreateBtn").addEventListener("click", () => showPage("create"));
    document.getElementById("backToAllBtn").addEventListener("click", () => showPage("all"));

    // fake create article submit
    document.getElementById("createForm").addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Published! (demo)");
      showPage("all");
    });

    // fake profile submit
    document.getElementById("profileForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fn = document.getElementById("firstName").value.trim();
      const ln = document.getElementById("lastName").value.trim();
      const em = document.getElementById("email").value.trim();
      const av = document.getElementById("avatarUrl").value.trim();

      if (fn || ln) document.getElementById("userProfile").textContent = (fn + " " + ln).trim();
      if (em) document.getElementById("profileEmail").textContent = em;
      if (av) document.getElementById("avatarUser").src = av;

      alert("Saved! (demo)");
    });

    // logout
    function doLogout() {
      localStorage.removeItem("token");
      window.location.href = "../index.html";
    }
    document.getElementById("logoutBtn").addEventListener("click", (e) => { e.preventDefault(); doLogout(); });
    document.getElementById("logoutBtn2").addEventListener("click", (e) => { e.preventDefault(); doLogout(); });

    // init page
    const saved = localStorage.getItem("activePage");
    showPage(pages.includes(saved) ? saved : "dashboard");
