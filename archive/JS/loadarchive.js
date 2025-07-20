document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('pero_no_le_creo_nada');
    header.innerHTML = "LInjector Versions from 2023 to " + new Date().getFullYear();

    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.textContent = 'Loading versions...';

    marked.setOptions({
        breaks: false,  // Convert line breaks to <br>
        gfm: true      // Use GitHub Flavored Markdown
    });

    document.querySelector('.center.getfullscreen').appendChild(loadingElement);

    document.getElementById('ToHome').addEventListener('click', () => {
        window.location.href = '../';
    });

    document.addEventListener('click', function () {
        document.querySelectorAll('.version-description-full').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('.version-item').forEach(item => {
            item.classList.remove('description-open');
            item.classList.remove('other-description-open');
        });
    });
    fetchReleases("lexteamz", "LInjector");
    fetchReleases("itzzexcel", "LInjector");

});

async function fetchReleases(account, repo) {
    const repoOwner = account;
    const repoName = repo;
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const releases = await response.json();
        displayReleases(releases, account);
    } catch (error) {
        console.error('Error fetching releases:', error);
        displayError('Failed to load versions. Please try again later.');
    }
}

function displayReleases(releases, user) {
    // Remove loading indicator
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }

    // Create version list container
    const versionListElement = document.createElement('div');
    versionListElement.className = 'version-list';

    // Sort releases by published date (newest first)
    releases.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    // Process each release
    releases.forEach((release, index) => {
        const versionItem = document.createElement('div');
        versionItem.className = 'version-item';

        const versionInfo = document.createElement('div');
        versionInfo.className = 'version-info';

        // Version number and tag
        const versionHeader = document.createElement('div');
        versionHeader.className = 'version-number';

        const versionText = document.createElement('span');
        versionText.className = 'version-text';
        versionText.textContent = release.name || release.tag_name;
        versionHeader.appendChild(versionText);

        // Add 'Latest release' tag to the first item
        if (index === 0 && user === "lexteamz") {
            const latestTag = document.createElement('span');
            latestTag.className = 'version-tag';
            latestTag.textContent = 'Latest release';
            versionHeader.appendChild(latestTag);
        }

        const userTag = document.createElement('span');
        userTag.className = 'user-tag';
        userTag.textContent = user;
        versionHeader.appendChild(userTag);
        if (user != "lexteamz") {
            const outdatedTag = document.createElement('span');
            outdatedTag.className = 'archived-tag';
            outdatedTag.textContent = 'Archived';
            versionHeader.appendChild(outdatedTag);
        }

        // Release date
        const releaseDate = new Date(release.published_at);
        const versionDate = document.createElement('div');
        versionDate.className = 'version-date';
        versionDate.textContent = releaseDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Release description
        if (release.body) {
            const versionDescription = document.createElement('div');
            versionDescription.className = 'version-description';

            // Create a short preview (first line only)
            let firstLine = release.body.split('\n')[0];
            firstLine = firstLine.replace(/^#\s*/, '');

            // Create a span for the preview text instead of a text node
            const previewSpan = document.createElement('span');
            previewSpan.textContent = firstLine;
            versionDescription.appendChild(previewSpan);

            // Add click event to toggle full description
            versionDescription.addEventListener('click', function (e) {
                const fullDesc = this.querySelector('.version-description-full');
                const parentItem = this.closest('.version-item');

                if (fullDesc.style.display === 'block') {
                    fullDesc.style.display = 'none';
                    parentItem.classList.remove('description-open');
                    document.querySelectorAll('.version-item').forEach(item => {
                        item.classList.remove('other-description-open');
                    });
                } else {
                    // Hide any other open descriptions first
                    document.querySelectorAll('.version-description-full').forEach(el => {
                        el.style.display = 'none';
                    });
                    document.querySelectorAll('.version-item').forEach(item => {
                        item.classList.remove('description-open');
                        item.classList.add('other-description-open');
                    });

                    fullDesc.style.display = 'block';
                    fullDesc.style.zIndex = '1000';
                    parentItem.classList.add('description-open');
                    parentItem.classList.remove('other-description-open');
                }
                e.stopPropagation();
            });

            // Create full description with markdown
            const fullDescription = document.createElement('div');
            fullDescription.className = 'version-description-full markdown-body';

            // Add close button
            const closeButton = document.createElement('div');
            closeButton.className = 'close-button';
            closeButton.innerHTML = '&times;';
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                fullDescription.style.display = 'none';

                // Remove classes when closing
                const parentItem = versionDescription.closest('.version-item');
                parentItem.classList.remove('description-open');
                document.querySelectorAll('.version-item').forEach(item => {
                    item.classList.remove('other-description-open');
                });

                setTimeout(() => { fullDescription.style.display = ''; }, 500);
            });
            fullDescription.appendChild(closeButton);

            // Create content container
            const contentContainer = document.createElement('div');

            // Use marked.js to render markdown with error handling
            try {
                contentContainer.innerHTML = marked.parse(release.body);
            } catch (error) {
                console.error('Error parsing markdown:', error);
                contentContainer.innerHTML = `<p>${release.body.replace(/\n/g, '<br>')}</p>`;
            }

            fullDescription.appendChild(contentContainer);

            // Add full description to the version description
            versionDescription.appendChild(fullDescription);

            // Add to version info
            versionInfo.appendChild(versionDescription);
        }

        // Download button
        const downloadDiv = document.createElement('div');
        downloadDiv.className = 'version-download';

        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';

        // if the user is lexteamz add the word 'tarball' instead
        if (user === "lexteamz" && index === 0) {
            downloadBtn.textContent = 'Tarball';
        } else {
            downloadBtn.textContent = 'Download';
        }
        downloadBtn.addEventListener('click', () => {
            // Find the asset to download (usually the first one)
            if (release.assets && release.assets.length > 0) {
                window.location.href = release.assets[0].browser_download_url;
            } else if (release.zipball_url) {
                window.location.href = release.zipball_url;
            }
        });

        

        const seeTagDiv = document.createElement('div');
        seeTagDiv.className = 'see-tag-div';

        const seeTagBtn = document.createElement('button');
        seeTagBtn.className = 'see-tag';
        seeTagBtn.textContent = 'GitHub';
        seeTagBtn.addEventListener('click', () => {
            window.location.href = release.html_url;
        });

        seeTagDiv.appendChild(seeTagBtn);
        downloadDiv.appendChild(seeTagDiv);
        versionInfo.prepend(versionDate);
        versionInfo.prepend(versionHeader);
        downloadDiv.appendChild(downloadBtn);

        if (user === "lexteamz" && index === 0) {
            const downloadMirrorBtn = document.createElement('button');
            downloadMirrorBtn.className = 'download-btn';
            downloadMirrorBtn.textContent = 'Download';
            downloadMirrorBtn.addEventListener('click', () => {
                window.location.href = "/download"
            });
            downloadDiv.style.gridTemplateColumns = 'repeat(3, 1fr)';
            downloadDiv.appendChild(downloadMirrorBtn);
        }

        versionItem.appendChild(versionInfo);
        versionItem.appendChild(downloadDiv);
        versionListElement.appendChild(versionItem);
    });

    document.querySelector('.center.getfullscreen').appendChild(versionListElement);
}

function displayError(message) {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;

    document.querySelector('.center.getfullscreen').appendChild(errorElement);
}