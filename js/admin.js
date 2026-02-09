// ===================================
// ADMIN PANEL - JavaScript
// ===================================

// Data Storage (using localStorage)
const STORAGE_KEYS = {
    achievements: 'egt_achievements',
    faculty: 'egt_faculty',
    mainFaculty: 'egt_main_faculty',
    notices: 'egt_notices',
    events: 'egt_events',
    gallery: 'egt_gallery',
    stats: 'egt_stats'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    loadAllData();
});

// ===================================
// TAB NAVIGATION
// ===================================
function initTabs() {
    const tabs = document.querySelectorAll('.admin-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');

            // Show corresponding content
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.admin-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

// ===================================
// DATA LOADING
// ===================================
function loadAllData() {
    loadAchievements();
    loadFaculty();
    loadNotices();
    loadEvents();
    loadGallery();
    loadStats();
}

function loadStats() {
    const stats = getData(STORAGE_KEYS.stats);
    if (stats) {
        document.getElementById('stat-students').value = stats.studentsCount || '5000+';
        document.getElementById('stat-passrate').value = stats.passRate || '95%';
        document.getElementById('stat-toppers').value = stats.topScorers || '500+';
        document.getElementById('stat-jee').value = stats.jeeSelections || '100+';
    }
}

function loadAchievements() {
    const achievements = getData(STORAGE_KEYS.achievements) || getDefaultAchievements();
    renderAchievements(achievements);
}

function loadFaculty() {
    const mainFaculty = getData(STORAGE_KEYS.mainFaculty);
    if (mainFaculty) {
        document.getElementById('main-faculty-name').value = mainFaculty.name || '';
        document.getElementById('main-faculty-title').value = mainFaculty.title || '';
        document.getElementById('main-faculty-bio').value = mainFaculty.bio || '';
        if (mainFaculty.image) {
            document.getElementById('main-faculty-preview').innerHTML = `<img src="${mainFaculty.image}" alt="Faculty">`;
        }
    }

    const faculty = getData(STORAGE_KEYS.faculty) || [];
    renderFaculty(faculty);
}

function loadNotices() {
    const notices = getData(STORAGE_KEYS.notices) || [];
    renderNotices(notices);
}

function loadEvents() {
    const events = getData(STORAGE_KEYS.events) || [];
    renderEvents(events);
}

function loadGallery() {
    const gallery = getData(STORAGE_KEYS.gallery) || [];
    renderGallery(gallery);
}

// ===================================
// RENDERING
// ===================================
function renderAchievements(achievements) {
    const container = document.getElementById('achievements-list');

    if (achievements.length === 0) {
        container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🏆</div>
        <p>No achievements added yet. Click "Add Achievement" to get started!</p>
      </div>
    `;
        return;
    }

    container.innerHTML = achievements.map((item, index) => `
    <div class="item-card">
      <div class="item-actions">
        <button class="item-action-btn edit" onclick="editAchievement(${index})" title="Edit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="item-action-btn delete" onclick="deleteAchievement(${index})" title="Delete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
      <div class="item-card-header">
        <span class="item-icon">${item.icon}</span>
        <div>
          <h4 class="item-title">${item.title}</h4>
          <p class="item-subtitle">${item.year || ''}</p>
        </div>
      </div>
      <p class="item-desc">${item.description}</p>
      <span class="item-badge">${item.badge}</span>
    </div>
  `).join('');
}

function renderFaculty(faculty) {
    const container = document.getElementById('faculty-list');

    if (faculty.length === 0) {
        container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">👨‍🏫</div>
        <p>No other faculty added yet. Click "Add Faculty" to add team members!</p>
      </div>
    `;
        return;
    }

    container.innerHTML = faculty.map((item, index) => `
    <div class="item-card">
      <div class="item-actions">
        <button class="item-action-btn edit" onclick="editFaculty(${index})" title="Edit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="item-action-btn delete" onclick="deleteFaculty(${index})" title="Delete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
      <div class="item-card-header">
        <span class="item-icon">${item.image ? `<img src="${item.image}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;">` : '👨‍🏫'}</span>
        <div>
          <h4 class="item-title">${item.name}</h4>
          <p class="item-subtitle">${item.subject}</p>
        </div>
      </div>
      <p class="item-desc">${item.experience || ''}</p>
    </div>
  `).join('');
}

function renderNotices(notices) {
    const container = document.getElementById('notices-list');

    if (notices.length === 0) {
        container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📢</div>
        <p>No notices added yet. Click "Add Notice" to create announcements!</p>
      </div>
    `;
        return;
    }

    container.innerHTML = notices.map((item, index) => `
    <div class="notice-item ${item.important ? 'important' : ''}">
      <div class="notice-content">
        <div class="notice-title">${item.title}</div>
        <p class="notice-desc">${item.description}</p>
      </div>
      <div class="notice-toggle">
        <label class="toggle">
          <input type="checkbox" ${item.active ? 'checked' : ''} onchange="toggleNotice(${index}, this.checked)">
          <span class="toggle-slider"></span>
        </label>
        <button class="item-action-btn delete" onclick="deleteNotice(${index})" title="Delete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

function renderEvents(events) {
    const container = document.getElementById('events-list');

    if (events.length === 0) {
        container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📅</div>
        <p>No events added yet. Click "Add Event" to schedule events!</p>
      </div>
    `;
        return;
    }

    container.innerHTML = events.map((item, index) => `
    <div class="item-card">
      <div class="item-actions">
        <button class="item-action-btn delete" onclick="deleteEvent(${index})" title="Delete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
      <div class="item-card-header">
        <span class="item-icon">📅</span>
        <div>
          <h4 class="item-title">${item.title}</h4>
          <p class="item-subtitle">${formatDate(item.date)} ${item.time ? '• ' + item.time : ''}</p>
        </div>
      </div>
      <p class="item-desc">${item.description || ''}</p>
      ${item.location ? `<span class="item-badge">📍 ${item.location}</span>` : ''}
    </div>
  `).join('');
}

function renderGallery(gallery) {
    const container = document.getElementById('gallery-list');

    if (gallery.length === 0) {
        container.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon">🖼️</div>
        <p>No photos added yet. Click "Add Photo" to upload images!</p>
      </div>
    `;
        return;
    }

    container.innerHTML = gallery.map((item, index) => `
    <div class="gallery-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="gallery-item-overlay">
        <span class="gallery-item-title">${item.title}</span>
        <button class="item-action-btn delete" onclick="deleteGalleryItem(${index})" style="position:absolute;top:8px;right:8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

// ===================================
// MODAL FUNCTIONS
// ===================================
function openModal(type) {
    document.getElementById(`${type}-modal`).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(type) {
    document.getElementById(`${type}-modal`).classList.remove('active');
    document.body.style.overflow = '';
    // Reset form
    document.getElementById(`${type}-form`)?.reset();
}

// ===================================
// SAVE FUNCTIONS
// ===================================
function saveStats() {
    const stats = {
        studentsCount: document.getElementById('stat-students').value,
        passRate: document.getElementById('stat-passrate').value,
        topScorers: document.getElementById('stat-toppers').value,
        jeeSelections: document.getElementById('stat-jee').value
    };

    saveData(STORAGE_KEYS.stats, stats);
    showToast('Stats saved successfully!', 'success');

    // Also save to JSON file structure
    updateDataFiles();
}

function saveAchievement(e) {
    e.preventDefault();

    const achievement = {
        id: Date.now(),
        icon: document.getElementById('achievement-icon').value,
        title: document.getElementById('achievement-title').value,
        description: document.getElementById('achievement-desc').value,
        badge: document.getElementById('achievement-badge').value,
        year: document.getElementById('achievement-year').value
    };

    const achievements = getData(STORAGE_KEYS.achievements) || [];
    achievements.push(achievement);
    saveData(STORAGE_KEYS.achievements, achievements);

    renderAchievements(achievements);
    closeModal('achievement');
    showToast('Achievement added!', 'success');
    updateDataFiles();
}

function saveMainFaculty() {
    const mainFaculty = {
        name: document.getElementById('main-faculty-name').value,
        title: document.getElementById('main-faculty-title').value,
        bio: document.getElementById('main-faculty-bio').value,
        image: getPreviewImage('main-faculty-preview')
    };

    saveData(STORAGE_KEYS.mainFaculty, mainFaculty);
    showToast('Main faculty saved!', 'success');
    updateDataFiles();
}

function saveFaculty(e) {
    e.preventDefault();

    const facultyMember = {
        id: Date.now(),
        name: document.getElementById('faculty-name').value,
        subject: document.getElementById('faculty-subject').value,
        experience: document.getElementById('faculty-experience').value,
        image: getPreviewImage('faculty-preview')
    };

    const faculty = getData(STORAGE_KEYS.faculty) || [];
    faculty.push(facultyMember);
    saveData(STORAGE_KEYS.faculty, faculty);

    renderFaculty(faculty);
    closeModal('faculty');
    showToast('Faculty member added!', 'success');
    updateDataFiles();
}

function saveNotice(e) {
    e.preventDefault();

    const notice = {
        id: Date.now(),
        title: document.getElementById('notice-title').value,
        description: document.getElementById('notice-desc').value,
        important: document.getElementById('notice-important').checked,
        active: document.getElementById('notice-active').checked,
        date: new Date().toISOString().split('T')[0]
    };

    const notices = getData(STORAGE_KEYS.notices) || [];
    notices.unshift(notice);
    saveData(STORAGE_KEYS.notices, notices);

    renderNotices(notices);
    closeModal('notice');
    showToast('Notice added!', 'success');
    updateDataFiles();
}

function saveEvent(e) {
    e.preventDefault();

    const event = {
        id: Date.now(),
        title: document.getElementById('event-title').value,
        description: document.getElementById('event-desc').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        location: document.getElementById('event-location').value,
        active: true
    };

    const events = getData(STORAGE_KEYS.events) || [];
    events.push(event);
    saveData(STORAGE_KEYS.events, events);

    renderEvents(events);
    closeModal('event');
    showToast('Event added!', 'success');
    updateDataFiles();
}

function saveGalleryItem(e) {
    e.preventDefault();

    const item = {
        id: Date.now(),
        title: document.getElementById('gallery-title').value,
        category: document.getElementById('gallery-category').value,
        image: getPreviewImage('gallery-preview')
    };

    if (!item.image) {
        showToast('Please select an image', 'error');
        return;
    }

    const gallery = getData(STORAGE_KEYS.gallery) || [];
    gallery.unshift(item);
    saveData(STORAGE_KEYS.gallery, gallery);

    renderGallery(gallery);
    closeModal('gallery');
    showToast('Photo added!', 'success');
}

// ===================================
// DELETE FUNCTIONS
// ===================================
function deleteAchievement(index) {
    if (!confirm('Delete this achievement?')) return;

    const achievements = getData(STORAGE_KEYS.achievements) || [];
    achievements.splice(index, 1);
    saveData(STORAGE_KEYS.achievements, achievements);
    renderAchievements(achievements);
    showToast('Achievement deleted', 'success');
    updateDataFiles();
}

function deleteFaculty(index) {
    if (!confirm('Delete this faculty member?')) return;

    const faculty = getData(STORAGE_KEYS.faculty) || [];
    faculty.splice(index, 1);
    saveData(STORAGE_KEYS.faculty, faculty);
    renderFaculty(faculty);
    showToast('Faculty member deleted', 'success');
    updateDataFiles();
}

function deleteNotice(index) {
    if (!confirm('Delete this notice?')) return;

    const notices = getData(STORAGE_KEYS.notices) || [];
    notices.splice(index, 1);
    saveData(STORAGE_KEYS.notices, notices);
    renderNotices(notices);
    showToast('Notice deleted', 'success');
    updateDataFiles();
}

function deleteEvent(index) {
    if (!confirm('Delete this event?')) return;

    const events = getData(STORAGE_KEYS.events) || [];
    events.splice(index, 1);
    saveData(STORAGE_KEYS.events, events);
    renderEvents(events);
    showToast('Event deleted', 'success');
    updateDataFiles();
}

function deleteGalleryItem(index) {
    if (!confirm('Delete this photo?')) return;

    const gallery = getData(STORAGE_KEYS.gallery) || [];
    gallery.splice(index, 1);
    saveData(STORAGE_KEYS.gallery, gallery);
    renderGallery(gallery);
    showToast('Photo deleted', 'success');
}

// ===================================
// TOGGLE FUNCTIONS
// ===================================
function toggleNotice(index, active) {
    const notices = getData(STORAGE_KEYS.notices) || [];
    notices[index].active = active;
    saveData(STORAGE_KEYS.notices, notices);
    showToast(active ? 'Notice enabled' : 'Notice disabled', 'success');
    updateDataFiles();
}

// ===================================
// EMOJI SELECTION
// ===================================
function selectEmoji(btn, type) {
    // Remove selected from siblings
    btn.parentElement.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
    // Add selected to clicked
    btn.classList.add('selected');
    // Update hidden input
    document.getElementById(`${type}-icon`).value = btn.textContent;
}

// ===================================
// IMAGE PREVIEW
// ===================================
function previewImage(input, previewId) {
    const preview = document.getElementById(previewId);

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function getPreviewImage(previewId) {
    const preview = document.getElementById(previewId);
    const img = preview.querySelector('img');
    return img ? img.src : '';
}

// ===================================
// HELPER FUNCTIONS
// ===================================
function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        return null;
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getDefaultAchievements() {
    return [
        { id: 1, icon: '🏆', title: 'Board Exam Toppers', description: 'Multiple students scoring 95%+ in board examinations every year', badge: 'Board Exams', year: '2025' },
        { id: 2, icon: '🎯', title: 'JEE Success Stories', description: 'Students selected in prestigious engineering colleges through JEE', badge: 'JEE Main & Advanced', year: '2025' },
        { id: 3, icon: '📈', title: 'Remarkable Improvements', description: 'Students improving from failing grades to scoring 80%+ in maths', badge: 'Improvement Stories', year: '2025' }
    ];
}

// ===================================
// UPDATE DATA FILES (for export)
// ===================================
function updateDataFiles() {
    // This function prepares data for manual export
    // In a real implementation, this would sync with a backend

    const exportData = {
        achievements: {
            stats: getData(STORAGE_KEYS.stats) || {},
            achievements: getData(STORAGE_KEYS.achievements) || []
        },
        faculty: {
            mainFaculty: getData(STORAGE_KEYS.mainFaculty) || {},
            otherFaculty: getData(STORAGE_KEYS.faculty) || []
        },
        events: {
            notices: getData(STORAGE_KEYS.notices) || [],
            events: getData(STORAGE_KEYS.events) || []
        }
    };

    // Store export data
    localStorage.setItem('egt_export_data', JSON.stringify(exportData));

    console.log('Data updated. Use exportData() to download JSON files.');
}

// Export function for downloading data
function exportData() {
    const data = localStorage.getItem('egt_export_data');
    if (!data) {
        alert('No data to export');
        return;
    }

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'egt-website-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Make exportData available globally
window.exportData = exportData;
