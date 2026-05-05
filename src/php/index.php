                <?php
                $articles_dir = __DIR__ . '/php/articles/';
                $files = glob($articles_dir . '*.php');
                rsort($files); // newest first
                $files = array_slice($files, 0, 3); // only show 3
 
                foreach ($files as $file) {
                    include $file;
                    $id = basename($file, '.php');
                    ?>
                    <div class="news-card">
                        <span class="news-tag"><?= htmlspecialchars($category) ?></span>
                        <h3><?= htmlspecialchars($title) ?></h3>
                        <p><?= htmlspecialchars($summary) ?></p>
                        <a href="/src/php/article.php?id=<?= htmlspecialchars($id) ?>" class="read-more">Read more →</a>
                    </div>
                    <?php
                }
                ?>