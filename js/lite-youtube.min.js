/**
 * Lite YouTube Embed - JavaScript
 * 
 * Replaces lite-youtube divs with actual YouTube iframes on click
 * Saves ~1.7MB per video until user interaction
 */

(function() {
    'use strict';
    
    function setupLiteYouTube() {
        const liteYoutubes = document.querySelectorAll('.lite-youtube');
        
        liteYoutubes.forEach(function(liteYoutube) {
            const videoId = liteYoutube.dataset.id;
            const videoTitle = liteYoutube.dataset.title || 'YouTube video';
            
            // Create thumbnail image
            const thumbnail = document.createElement('img');
            thumbnail.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            thumbnail.alt = videoTitle;
            thumbnail.loading = 'lazy';
            liteYoutube.appendChild(thumbnail);
            
            // Create play button
            const playBtn = document.createElement('button');
            playBtn.className = 'lite-youtube-playbtn';
            playBtn.setAttribute('aria-label', 'Play video');
            liteYoutube.appendChild(playBtn);
            
            // Load iframe on click
            liteYoutube.addEventListener('click', function() {
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
                iframe.title = videoTitle;
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
                iframe.frameBorder = '0';
                
                // Replace lite element with iframe
                this.innerHTML = '';
                this.appendChild(iframe);
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupLiteYouTube);
    } else {
        setupLiteYouTube();
    }
})();
