<!DOCTYPE html>
<html lang="en" data-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News — City</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=DM+Serif+Text&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="/src/css/news.css">
</head>

<body>

    <!-- ===== HEADER ===== -->
    <header class="header">
        <div class="header-container">
            <a href="/src/index.html" class="logo">City</a>
            <nav class="nav">
                <ul class="nav-links top-links">
                    <li><button class="nav-btn" data-modal="residents">Residents</button></li>
                    <li><button class="nav-btn" data-modal="community">Community</button></li>
                    <li><button class="nav-btn" data-modal="business">Business</button></li>
                    <li><button class="nav-btn" data-modal="government">Government</button></li>
                </ul>
                <ul class="nav-links bottom-links">
                    <li><a href="/src/html/about-city.html">About City</a></li>
                    <li><a href="/src/php/news.php">News</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Get involved</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="/src/html/contact-us.html">Contact us</a></li>
                </ul>
            </nav>
            <div class="header-actions">
                <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                    <i class="fa-solid fa-moon" id="theme-icon"></i>
                </button>
                <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
                <button class="hamburger" id="hamburger" aria-label="Open menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </header>

    <!-- ===== NAV MODALS ===== -->
    <div class="nav-modal-container">
        <div class="nav-modal" id="residents">
            <div class="modal-left"><h3>Residents</h3><p>Explore services, resources, and community events tailored for residents of City.</p></div>
            <div class="modal-right"><ul>
                <li><a href="#"><i class="fa-solid fa-calendar"></i> Events & Activities</a></li>
                <li><a href="#"><i class="fa-solid fa-map"></i> City Discovery Map</a></li>
                <li><a href="#"><i class="fa-solid fa-tree"></i> Parks & Recreation</a></li>
                <li><a href="#"><i class="fa-solid fa-leaf"></i> Sustainability</a></li>
            </ul></div>
        </div>
        <div class="nav-modal" id="community">
            <div class="modal-left"><h3>Community</h3><p>Engage with local organizations, events, and volunteer opportunities.</p></div>
            <div class="modal-right"><ul>
                <li><a href="#"><i class="fa-solid fa-hands-helping"></i> Volunteer Opportunities</a></li>
                <li><a href="#"><i class="fa-solid fa-users"></i> Community Groups</a></li>
                <li><a href="#"><i class="fa-solid fa-calendar-check"></i> Upcoming Events</a></li>
            </ul></div>
        </div>
        <div class="nav-modal" id="business">
            <div class="modal-left"><h3>Business</h3><p>Resources and support for local businesses, entrepreneurs, and investors.</p></div>
            <div class="modal-right"><ul>
                <li><a href="#"><i class="fa-solid fa-briefcase"></i> Business Resources</a></li>
                <li><a href="#"><i class="fa-solid fa-chart-line"></i> Economic Reports</a></li>
                <li><a href="#"><i class="fa-solid fa-building"></i> Development Opportunities</a></li>
            </ul></div>
        </div>
        <div class="nav-modal" id="government">
            <div class="modal-left"><h3>Government</h3><p>Information on city services, programs, and governance.</p></div>
            <div class="modal-right"><ul>
                <li><a href="#"><i class="fa-solid fa-gavel"></i> Policies & Bylaws</a></li>
                <li><a href="#"><i class="fa-solid fa-file"></i> Reports & Documents</a></li>
                <li><a href="#"><i class="fa-solid fa-handshake"></i> Citizen Services</a></li>
            </ul></div>
        </div>
    </div>

    <!-- ===== MOBILE MENU ===== -->
    <div class="mobile-menu" id="mobile-menu">
        <ul>
            <li><a href="/src/html/about-city.html">About City</a></li>
            <li><a href="/src/php/news.php">News</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Get Involved</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="/src/html/contact-us.html">Contact Us</a></li>
        </ul>
        <div class="mobile-categories">
            <a href="#">Residents</a>
            <a href="#">Community</a>
            <a href="#">Business</a>
            <a href="#">Government</a>
        </div>
    </div>

    <?php
    // ===== LOAD ARTICLE =====
    $id = preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['id'] ?? '');
    $file = __DIR__ . '/articles/' . $id . '.php';

    if (empty($id) || !file_exists($file)) {
        // Article not found
        echo '
        <section class="article-not-found">
            <i class="fa-solid fa-circle-exclamation"></i>
            <h2>Article Not Found</h2>
            <p>The article you are looking for does not exist.</p>
            <a href="/src/php/news.php" class="btn-primary">← Back to News</a>
        </section>';
    } else {
        include $file;
    ?>

    <!-- ===== ARTICLE HERO ===== -->
    <section class="article-hero" style="background-image: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('<?= htmlspecialchars($image) ?>')">
        <div class="article-hero-content" data-aos="fade-up">
            <span class="article-tag"><?= htmlspecialchars($category) ?></span>
            <h1><?= htmlspecialchars($title) ?></h1>
            <p class="article-date"><i class="fa-regular fa-calendar"></i> <?= htmlspecialchars($date) ?></p>
        </div>
    </section>

    <!-- ===== ARTICLE BODY ===== -->
    <section class="article-section">
        <div class="article-container" data-aos="fade-up">
            <a href="/src/php/news.php" class="back-link">← Back to News</a>
            <div class="article-body">
                <?= $content ?>
            </div>
        </div>
    </section>

    <?php } ?>

    <!-- ===== FOOTER ===== -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-logo"><a href="/src/index.html" class="logo">City</a></div>
            <div class="footer-contact">
                <h3>Keep in Touch</h3>
                <p>Email: info@city.com</p>
                <p>Phone: +123 456 789</p>
                <div class="social-icons">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
            <div class="footer-button"><a href="/src/html/contact-us.html" class="btn">Contact Us</a></div>
        </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="/src/js/home-page.js"></script>
</body>
</html>
