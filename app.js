// ==================== 0. THÔNG BÁO (TOAST) ====================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return alert(message);
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = type === 'error' ? '❌' : (type === 'info' ? 'ℹ️' : '✔️');
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.animation = 'fadeOut 0.3s ease-out forwards'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ==================== 1. KHỞI TẠO DỮ LIỆU ĐẦY ĐỦ ====================
function initData() {
    if (!localStorage.getItem('hotel_rooms')) {
        localStorage.setItem('hotel_rooms', JSON.stringify([
            { id: 1, roomNumber: 'P101', name: "Standard Single Room", price: 500000, isAvailable: true, status: 'Sẵn sàng' },
            { id: 2, roomNumber: 'P102', name: "Deluxe Double Room", price: 1200000, isAvailable: false, status: 'Đang có khách' },
            { id: 3, roomNumber: 'P205', name: "Executive Suite VIP", price: 3500000, isAvailable: true, status: 'Sẵn sàng' }
        ]));
    }
    if (!localStorage.getItem('hotel_room_types')) {
        localStorage.setItem('hotel_room_types', JSON.stringify([
            { id: 'LP01', name: 'Standard Single Room', beds: '1 Giường đơn', maxPeople: '1 Người', price: 500000 },
            { id: 'LP02', name: 'Deluxe Double Room', beds: '1 Giường đôi', maxPeople: '2 Người', price: 1200000 },
            { id: 'LP03', name: 'Executive Suite VIP', beds: '2 Giường đôi', maxPeople: '4 Người', price: 3500000 }
        ]));
    }
    if (!localStorage.getItem('hotel_services')) {
        localStorage.setItem('hotel_services', JSON.stringify([
            { id: 'DV01', name: 'Đưa đón sân bay', category: 'Vận chuyển', price: 300000, status: 'Hoạt động' },
            { id: 'DV02', name: 'Massage Body 60p', category: 'Spa & Relax', price: 500000, status: 'Hoạt động' },
            { id: 'DV03', name: 'Giặt ủi tiêu chuẩn', category: 'Tiện ích', price: 50000, status: 'Tạm ngưng' },
            { id: 'DV04', name: 'Buffet Sáng', category: 'Ẩm thực', price: 250000, status: 'Hoạt động' }
        ]));
    }
    if (!localStorage.getItem('hotel_settings')) {
        localStorage.setItem('hotel_settings', JSON.stringify({
            name: 'HUCE HOTEL', phone: '1900 1234', address: '55 Giải Phóng, Hà Nội', checkin: '14:00', checkout: '12:00', vat: 8
        }));
    }
    if (!localStorage.getItem('hotel_users')) {
        localStorage.setItem('hotel_users', JSON.stringify([
            { username: 'admin', password: '123', fullname: 'Quản trị viên', role: 'admin' },
            { username: 'vana.nguyen@gmail.com', password: '123', fullname: 'Nguyễn Văn A', phone: '0987654321', role: 'customer' }
        ]));
    }
    if (!localStorage.getItem('hotel_bookings')) {
        localStorage.setItem('hotel_bookings', JSON.stringify([
            { id: 'DDP001', username: 'vana.nguyen@gmail.com', customerName: 'Nguyễn Văn A', phone: '0987654321', roomName: 'Deluxe Double Room', checkin: '12/05/2026', checkout: '15/05/2026', status: 'Đã xác nhận', totalPrice: 1200000 }
        ]));
    }
    if (!localStorage.getItem('hotel_used_services')) {
        localStorage.setItem('hotel_used_services', JSON.stringify([
            { id: '#SDV001', username: 'vana.nguyen@gmail.com', serviceName: 'Đưa đón sân bay', date: '12/05/2026', quantity: 1, total: 300000 },
            { id: '#SDV002', username: 'vana.nguyen@gmail.com', serviceName: 'Buffet Sáng', date: '13/05/2026', quantity: 2, total: 500000 }
        ]));
    }
    if (!localStorage.getItem('hotel_reviews')) {
        localStorage.setItem('hotel_reviews', JSON.stringify([
            { id: 1, customerName: 'Trần Thị B', date: '18/06/2026', stars: 5, content: 'Phòng ốc cực kỳ sạch sẽ, view nhìn ra biển tuyệt đẹp. Dịch vụ buffet sáng đa dạng và ngon miệng. Chắc chắn sẽ quay lại!', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 2, customerName: 'Lê Văn C', date: '15/06/2026', stars: 4, content: 'Trải nghiệm tuyệt vời. Tiện ích đầy đủ, đưa đón sân bay đúng giờ. Tuy nhiên dịch vụ giặt ủi cần cải thiện tốc độ một chút.', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { id: 3, customerName: 'Phạm Thị D', date: '10/06/2026', stars: 5, content: 'Spa massage relax rất đã, nhân viên nhiệt tình, nhẹ nhàng. Đánh giá 5 sao cho chất lượng phục vụ của HUCE Hotel.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
        ]));
    }
    syncSettingsToUI();
}

function syncSettingsToUI() {
    let settings = JSON.parse(localStorage.getItem('hotel_settings'));
    if (settings) document.querySelectorAll('.hotel-name-display').forEach(el => el.innerText = settings.name);
}

// ==================== 2. TÀI KHOẢN & ĐIỀU HƯỚNG ====================
function login() {
    const roleInp = document.getElementById('user-role').value; 
    const userInp = document.getElementById('username').value.trim();
    const passInp = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('hotel_users')) || [];
    const validUser = users.find(u => u.username === userInp && u.password === passInp);

    if (validUser) {
        if (validUser.role !== roleInp) return showToast("Tài khoản không có quyền truy cập vai trò này!", "error");
        localStorage.setItem('is_logged_in', 'true');
        localStorage.setItem('current_user', validUser.fullname); 
        localStorage.setItem('current_username', validUser.username); 
        localStorage.setItem('current_role', validUser.role);
        
        closeLoginModal(); 
        if (validUser.role === 'admin') { showAdminPage(); showToast(`Xin chào Quản trị viên!`, "success"); } 
        else { showHomePage(); updateHeaderUI(); showToast(`Xin chào ${validUser.fullname}!`, "success"); }
    } else { document.getElementById('login-error').style.display = 'block'; }
}

function logout() {
    // Chỉ xóa các biến phiên đăng nhập, KHÔNG xóa sạch database
    localStorage.removeItem('is_logged_in');
    localStorage.removeItem('current_user');
    localStorage.removeItem('current_username');
    localStorage.removeItem('current_role');
    
    document.getElementById('admin-screen').style.display = 'none';
    document.getElementById('customer-view').style.display = 'block';
    updateHeaderUI(); 
    showHomePage(); 
    showToast("Đã đăng xuất!", "info");
}

function register() {
    const fullname = document.getElementById('reg-fullname').value.trim();
    const username = document.getElementById('reg-username').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const idcard = document.getElementById('reg-idcard').value.trim(); // Lấy CCCD
    const address = document.getElementById('reg-address').value.trim(); // Lấy Địa chỉ
    const pass = document.getElementById('reg-password').value;
    const confirmPass = document.getElementById('reg-confirm-password').value;

    if (!fullname || !username || !pass) return showToast("Vui lòng điền đủ thông tin bắt buộc!", "error");
    if (pass !== confirmPass) return showToast("Mật khẩu không khớp!", "error");

    let users = JSON.parse(localStorage.getItem('hotel_users')) || [];
    if (users.some(u => u.username === username)) return showToast("Email đã tồn tại!", "error");

    // Lưu thêm idcard và address vào database
    users.push({ username: username, password: pass, fullname: fullname, phone: phone, idcard: idcard, address: address, role: 'customer' });
    localStorage.setItem('hotel_users', JSON.stringify(users));
    showToast("Đăng ký thành công!", "success"); switchToLogin();
}

function checkInitialState() {
    if (localStorage.getItem('is_logged_in') === 'true') {
        if (localStorage.getItem('current_role') === 'admin') showAdminPage();
        else { showHomePage(); updateHeaderUI(); }
    } else { showHomePage(); updateHeaderUI(); }
}

function updateHeaderUI() {
    const isLoggedIn = localStorage.getItem('is_logged_in');
    const avatar = document.getElementById('user-avatar');
    if (isLoggedIn === 'true') {
        document.getElementById('nav-login-btn').style.display = 'none';
        document.getElementById('nav-logout-btn').style.display = 'block';
        avatar.innerHTML = (localStorage.getItem('current_user') || 'U').charAt(0).toUpperCase();
        avatar.style.backgroundColor = '#d4af37'; 
    } else {
        document.getElementById('nav-login-btn').style.display = 'block';
        document.getElementById('nav-logout-btn').style.display = 'none';
        avatar.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        avatar.style.backgroundColor = '#e0e0e0';
    }
}

// Ẩn tất cả màn hình
function hideAllScreens() {
    ['admin-screen', 'profile-screen', 'home-screen', 'review-screen', 'service-screen'].forEach(id => {
        let el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    let search = document.getElementById('search-bar');
    if (search) search.style.display = 'none';
}

function showHomePage() {
    hideAllScreens();
    document.getElementById('customer-view').style.display = 'block';
    document.getElementById('home-screen').style.display = 'block';
    document.getElementById('search-bar').style.display = 'flex'; 
}

function showReviewPage() {
    hideAllScreens();
    document.getElementById('customer-view').style.display = 'block';
    document.getElementById('review-screen').style.display = 'block';
    renderReviews();
}

function showServicePage() {
    hideAllScreens();
    document.getElementById('customer-view').style.display = 'block';
    document.getElementById('service-screen').style.display = 'block';
    renderCustomerServices();
}

function showProfilePage() {
    if (localStorage.getItem('is_logged_in') !== 'true') return openLoginModal();
    hideAllScreens();
    document.getElementById('customer-view').style.display = 'block';
    document.getElementById('profile-screen').style.display = 'block';
    switchProfileTab('info');
}

function openLoginModal() { document.getElementById('login-modal').style.display = 'flex'; document.getElementById('register-modal').style.display = 'none'; }
function closeLoginModal() { document.getElementById('login-modal').style.display = 'none'; document.getElementById('login-error').style.display = 'none'; }
function openRegisterModal() { document.getElementById('register-modal').style.display = 'flex'; document.getElementById('login-modal').style.display = 'none'; }
function closeRegisterModal() { document.getElementById('register-modal').style.display = 'none'; }
function switchToRegister() { openRegisterModal(); }
function switchToLogin() { openLoginModal(); }


// ==================== 3. TRANG ĐÁNH GIÁ (REVIEWS) VÀ DỊCH VỤ ====================
function renderReviews() {
    const reviews = JSON.parse(localStorage.getItem('hotel_reviews')) || [];
    const container = document.getElementById('review-list');
    if (!container) return;
    container.innerHTML = '';
    
    reviews.forEach(r => {
        let starsHTML = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
        let imgHTML = r.image ? `<img src="${r.image}" class="review-image" alt="Review Image">` : '';
        
        container.innerHTML += `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-avatar">${r.customerName.charAt(0)}</div>
                    <div class="review-info"><h4>${r.customerName}</h4><p class="review-date">${r.date}</p></div>
                </div>
                <div class="review-stars">${starsHTML}</div>
                <p class="review-text">"${r.content}"</p>
                ${imgHTML}
            </div>
        `;
    });
}

function renderCustomerServices() {
    const services = JSON.parse(localStorage.getItem('hotel_services')) || [];
    const container = document.getElementById('service-list');
    if (!container) return;
    container.innerHTML = '';
    
    const activeServices = services.filter(s => s.status === 'Hoạt động');
    if (activeServices.length === 0) return container.innerHTML = '<p style="text-align:center; width:100%;">Hiện chưa có dịch vụ nào khả dụng.</p>';

    activeServices.forEach(s => {
        let imgUrl = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';
        if(s.category === 'Vận chuyển') imgUrl = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';
        if(s.category === 'Ẩm thực') imgUrl = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

        container.innerHTML += `
            <div class="room-card" style="overflow: hidden; padding: 0; display: flex; flex-direction: column;">
                <img src="${imgUrl}" style="width: 100%; height: 180px; object-fit: cover;" alt="${s.name}">
                <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; text-align: left;">
                    <p class="service-category">${s.category}</p>
                    <h3 style="margin-bottom: 5px;">${s.name}</h3>
                    <p class="price" style="font-size: 16px; color: #d4af37;">${s.price.toLocaleString('vi-VN')} VND</p>
                    <p style="color: #666; font-size: 13px; margin-top: 10px; font-style: italic;">* Vui lòng chọn dịch vụ ở bước Đặt Phòng</p>
                </div>
            </div>
        `;
    });
}


// ==================== 4. CHỨC NĂNG ĐẶT PHÒNG CỦA KHÁCH HÀNG ====================
function renderRooms(roomsToRender = null) {
    const allRooms = JSON.parse(localStorage.getItem('hotel_rooms')) || [];
    const container = document.getElementById("room-container");
    container.innerHTML = ""; 
    let displayRooms = roomsToRender || allRooms.filter(r => r.isAvailable);

    if (displayRooms.length === 0) return container.innerHTML = "<p>Rất tiếc, đã hết phòng trống!</p>";
    displayRooms.forEach(room => {
        container.innerHTML += `
            <div class="room-card">
                <h3>${room.name}</h3><p class="price">${room.price.toLocaleString('vi-VN')} VND / đêm</p>
                <button class="book-btn" onclick="attemptToBook(${room.id}, '${room.name}', ${room.price})">Đặt Phòng</button>
            </div>
        `;
    });
}

function searchRooms() {
    const selectedType = document.getElementById('room-type-search').value;
    let filteredRooms = (JSON.parse(localStorage.getItem('hotel_rooms')) || []).filter(r => r.isAvailable);
    if (selectedType !== 'all') filteredRooms = filteredRooms.filter(r => r.name === selectedType); 
    renderRooms(filteredRooms);
    document.querySelector('.room-section').scrollIntoView({ behavior: 'smooth' });
}

let currentBookingRoom = null;

function attemptToBook(roomId, roomName, price) {
    if (localStorage.getItem('is_logged_in') !== 'true') { 
        showToast("Đăng nhập trước khi đặt phòng!", "error"); 
        return openLoginModal(); 
    }
    
    currentBookingRoom = { id: roomId, name: roomName, price: price };
    document.getElementById('booking-room-name').innerText = roomName;
    document.getElementById('booking-room-price').innerText = price.toLocaleString('vi-VN');
    
    const services = JSON.parse(localStorage.getItem('hotel_services')) || [];
    const activeServices = services.filter(s => s.status === 'Hoạt động');
    const sList = document.getElementById('booking-services-list');
    sList.innerHTML = '';
    
    if(activeServices.length === 0) {
        sList.innerHTML = '<p style="color:#888; font-size:12px; margin:0;">Hiện không có dịch vụ nào.</p>';
    } else {
        activeServices.forEach(s => {
            sList.innerHTML += `
                <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; cursor: pointer; text-transform: none; font-weight: normal; color: #333; font-size: 14px;">
                    <span><input type="checkbox" class="booking-service-cb" value="${s.price}" data-name="${s.name}" onchange="updateBookingTotal()" style="margin-right: 8px;"> ${s.name}</span>
                    <span style="color: #666; font-size: 13px;">+${s.price.toLocaleString('vi-VN')}đ</span>
                </label>
            `;
        });
    }
    
    updateBookingTotal();
    document.getElementById('booking-modal').style.display = 'flex';
}

function updateBookingTotal() {
    let total = currentBookingRoom.price;
    document.querySelectorAll('.booking-service-cb:checked').forEach(cb => {
        total += parseInt(cb.value);
    });
    document.getElementById('booking-total-price').innerText = total.toLocaleString('vi-VN') + ' VND';
}

function closeBookingModal() {
    document.getElementById('booking-modal').style.display = 'none';
}

function submitBooking() {
    let checkin = document.getElementById('search-checkin').value || 'Hôm nay';
    let checkout = document.getElementById('search-checkout').value || 'Ngày mai';

    let rooms = JSON.parse(localStorage.getItem('hotel_rooms'));
    let roomIdx = rooms.findIndex(r => r.id === currentBookingRoom.id);
    
    if (roomIdx !== -1) { 
        rooms[roomIdx].isAvailable = false; 
        rooms[roomIdx].status = 'Đang có khách'; 
        localStorage.setItem('hotel_rooms', JSON.stringify(rooms)); 

        let currentUser = JSON.parse(localStorage.getItem('hotel_users')).find(u => u.username === localStorage.getItem('current_username'));
        
        let selectedServices = [];
        let total = currentBookingRoom.price;
        document.querySelectorAll('.booking-service-cb:checked').forEach(cb => {
            selectedServices.push({ name: cb.getAttribute('data-name'), price: parseInt(cb.value) });
            total += parseInt(cb.value);
        });

        let bookings = JSON.parse(localStorage.getItem('hotel_bookings')) || [];
        bookings.unshift({ 
            id: 'DDP' + Math.floor(Math.random() * 900 + 100), 
            username: currentUser.username, 
            customerName: currentUser.fullname, 
            phone: currentUser.phone || '', 
            roomName: currentBookingRoom.name, 
            checkin: checkin, 
            checkout: checkout, 
            status: 'Đã xác nhận', 
            totalPrice: total 
        });
        localStorage.setItem('hotel_bookings', JSON.stringify(bookings));

        if(selectedServices.length > 0) {
            let usedServices = JSON.parse(localStorage.getItem('hotel_used_services')) || [];
            let today = new Date();
            let dateStr = today.getDate().toString().padStart(2, '0') + '/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getFullYear();
            
            selectedServices.forEach(s => {
                usedServices.unshift({
                    id: '#SDV' + Math.floor(Math.random() * 900 + 100), 
                    username: currentUser.username, 
                    serviceName: s.name, 
                    date: dateStr, 
                    quantity: 1, 
                    total: s.price
                });
            });
            localStorage.setItem('hotel_used_services', JSON.stringify(usedServices));
        }

        showToast(`Tuyệt vời! Bạn đã đặt phòng thành công.`, "success"); 
        closeBookingModal();
        searchRooms(); 
    }
}


// ==================== 5. PROFILE KHÁCH HÀNG ====================
function switchProfileTab(tabName) {
    document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.getElementById(`tab-menu-${tabName}`).classList.add('active');
    document.getElementById(`tab-content-${tabName}`).style.display = 'block';
    
    if (tabName === 'info') loadProfileData();
    if (tabName === 'history') loadBookingHistory();
    if (tabName === 'services') loadUsedServices();
}

function loadProfileData() {
    const user = JSON.parse(localStorage.getItem('hotel_users')).find(u => u.username === localStorage.getItem('current_username'));
    if (user) {
        document.getElementById('profile-avatar-large').innerText = user.fullname.charAt(0).toUpperCase();
        document.getElementById('prof-fullname').value = user.fullname || '';
        document.getElementById('prof-email').value = user.username || ''; 
        document.getElementById('prof-phone').value = user.phone || '';
        document.getElementById('prof-idcard').value = user.idcard || '';   // Load CCCD
        document.getElementById('prof-address').value = user.address || ''; // Load Địa chỉ
    }
}
}

function loadBookingHistory() {
    const myBookings = (JSON.parse(localStorage.getItem('hotel_bookings')) || []).filter(b => b.username === localStorage.getItem('current_username'));
    const tbody = document.getElementById('history-tbody');
    tbody.innerHTML = '';
    if (myBookings.length === 0) return tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Bạn chưa có đơn phòng nào.</td></tr>`;
    myBookings.forEach(b => {
        let badge = 'confirmed'; if (b.status === 'Đã hủy') badge = 'cancelled';
        tbody.innerHTML += `<tr><td><strong>${b.id}</strong></td><td>${b.roomName}</td><td>${b.checkin} - ${b.checkout}</td><td><span class="badge ${badge}">${b.status}</span></td><td>${(b.totalPrice||0).toLocaleString('vi-VN')}đ</td></tr>`;
    });
}

function loadUsedServices() {
    const myServices = (JSON.parse(localStorage.getItem('hotel_used_services')) || []).filter(s => s.username === localStorage.getItem('current_username'));
    const tbody = document.getElementById('services-tbody');
    if(!tbody) return;
    tbody.innerHTML = '';
    if (myServices.length === 0) return tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Bạn chưa sử dụng dịch vụ nào.</td></tr>`;
    myServices.forEach(s => {
        tbody.innerHTML += `<tr><td><strong>${s.id}</strong></td><td>${s.serviceName}</td><td>${s.date}</td><td>${s.quantity}</td><td>${(s.total||0).toLocaleString('vi-VN')}đ</td></tr>`;
    });
}

function updateProfile() { 
    let users = JSON.parse(localStorage.getItem('hotel_users')) || [];
    let currentUser = localStorage.getItem('current_username');
    let userIndex = users.findIndex(u => u.username === currentUser);
    
    if (userIndex !== -1) {
        users[userIndex].fullname = document.getElementById('prof-fullname').value.trim();
        users[userIndex].phone = document.getElementById('prof-phone').value.trim();
        users[userIndex].idcard = document.getElementById('prof-idcard').value.trim();
        users[userIndex].address = document.getElementById('prof-address').value.trim();
        
        localStorage.setItem('hotel_users', JSON.stringify(users));
        localStorage.setItem('current_user', users[userIndex].fullname); // Cập nhật tên mới
        
        updateHeaderUI(); // Load lại Avatar góc phải
        showToast("Cập nhật thông tin thành công!", "success"); 
    }
}
function changePassword() { showToast("Cập nhật mật khẩu thành công!", "success"); }
function resetData() { localStorage.clear(); initData(); renderRooms(); checkInitialState(); showToast("Đã khôi phục dữ liệu gốc!", "info"); }


// ==================== 6. ADMIN PANEL ====================
function showAdminPage() {
    hideAllScreens();
    document.getElementById('customer-view').style.display = 'none'; // <--- THÊM DÒNG NÀY ĐỂ ẨN HEADER & FOOTER KHÁCH
    document.getElementById('admin-screen').style.display = 'flex';
    switchAdminTab('rooms'); 
}

function switchAdminTab(tabId) {
    document.querySelectorAll('.admin-nav-menu li').forEach(li => li.classList.remove('active'));
    document.getElementById('nav-admin-' + tabId).classList.add('active');
    document.querySelectorAll('.admin-tab-content').forEach(content => content.style.display = 'none');
    document.getElementById('admin-tab-' + tabId).style.display = 'block';

    if (tabId === 'rooms') renderAdminRooms();
    if (tabId === 'room-types') renderAdminRoomTypes();
    if (tabId === 'bookings') renderAdminBookings();
    if (tabId === 'services') renderAdminServices();
    if (tabId === 'settings') renderAdminSettings();
}

function renderAdminRooms() {
    const rooms = JSON.parse(localStorage.getItem('hotel_rooms')) || [];
    const tbody = document.getElementById('admin-rooms-tbody');
    tbody.innerHTML = '';
    rooms.forEach(room => {
        let statusClass = 'status-ready';
        if (room.status === 'Đang có khách') statusClass = 'status-occupied';
        if (room.status === 'Đang dọn dẹp') statusClass = 'status-cleaning';
        tbody.innerHTML += `<tr>
            <td><strong>${room.roomNumber}</strong></td><td>Phòng ${room.roomNumber.replace('P', '')}</td><td>${room.name}</td>
            <td><span class="status-badge ${statusClass}">${room.status}</span></td>
            <td><button class="btn-action" onclick="mockUpdateStatus(${room.id})">Đổi trạng thái</button></td>
        </tr>`;
    });
}

function mockUpdateStatus(roomId) {
    let rooms = JSON.parse(localStorage.getItem('hotel_rooms'));
    const i = rooms.findIndex(r => r.id === roomId);
    if (i !== -1) {
        if (rooms[i].status === 'Sẵn sàng') { rooms[i].status = 'Đang có khách'; rooms[i].isAvailable = false; } 
        else if (rooms[i].status === 'Đang có khách') { rooms[i].status = 'Đang dọn dẹp'; rooms[i].isAvailable = false; } 
        else { rooms[i].status = 'Sẵn sàng'; rooms[i].isAvailable = true; }
        localStorage.setItem('hotel_rooms', JSON.stringify(rooms)); renderAdminRooms(); showToast("Cập nhật thành công!", "success");
    }
}

function renderAdminRoomTypes(typesRender = null) {
    const types = typesRender || JSON.parse(localStorage.getItem('hotel_room_types')) || [];
    const tbody = document.getElementById('admin-room-types-tbody');
    tbody.innerHTML = '';
    if (types.length === 0) return tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Không có dữ liệu</td></tr>`;
    types.forEach(type => {
        tbody.innerHTML += `<tr>
            <td><strong>${type.id}</strong></td><td>${type.name}</td><td>${type.beds}</td><td>${type.maxPeople}</td><td>${type.price.toLocaleString('vi-VN')}đ</td>
            <td><button class="btn-edit" onclick="showToast('Đang xây dựng','info')">Sửa</button><button class="btn-delete" onclick="showToast('Đang xây dựng','error')">Xóa</button></td>
        </tr>`;
    });
}

function searchAdminRoomTypes() {
    const kw = document.getElementById('admin-search-type-input').value.toLowerCase();
    const filtered = (JSON.parse(localStorage.getItem('hotel_room_types')) || []).filter(t => t.id.toLowerCase().includes(kw) || t.name.toLowerCase().includes(kw));
    renderAdminRoomTypes(filtered);
}

function renderAdminBookings(bookRender = null) {
    const bookings = bookRender || JSON.parse(localStorage.getItem('hotel_bookings')) || [];
    const tbody = document.getElementById('admin-bookings-tbody');
    tbody.innerHTML = '';
    if (bookings.length === 0) return tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Chưa có đơn đặt phòng nào.</td></tr>`;
    bookings.forEach(b => {
        let badge = 'confirmed'; if (b.status === 'Đã thanh toán') badge = 'completed'; if (b.status === 'Đã hủy') badge = 'cancelled';
        let actions = b.status === 'Đã xác nhận' ? `<button class="btn-action-outline" onclick="showToast('Đang lập hóa đơn...','info')">Lập HD</button><button class="btn-action-outline text-danger" onclick="showToast('Đã hủy','error')">Hủy</button>` : `<button class="btn-action-outline" onclick="showToast('Xem chi tiết','info')">Chi tiết</button>`;
        tbody.innerHTML += `<tr>
            <td><strong>${b.id}</strong></td><td>${b.customerName || 'Khách'}</td><td>${b.checkin} - ${b.checkout}</td>
            <td>${(b.totalPrice||0).toLocaleString('vi-VN')}đ</td><td><span class="badge ${badge}">${b.status}</span></td><td>${actions}</td>
        </tr>`;
    });
}

function searchAdminBookings() {
    const kw = document.getElementById('admin-search-booking-input').value.toLowerCase();
    const filtered = (JSON.parse(localStorage.getItem('hotel_bookings')) || []).filter(b => (b.id && b.id.toLowerCase().includes(kw)) || (b.customerName && b.customerName.toLowerCase().includes(kw)) || (b.phone && b.phone.includes(kw)));
    renderAdminBookings(filtered);
}

function renderAdminServices(servicesRender = null) {
    const services = servicesRender || JSON.parse(localStorage.getItem('hotel_services')) || [];
    const tbody = document.getElementById('admin-services-tbody');
    tbody.innerHTML = '';
    if (services.length === 0) return tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Không tìm thấy dịch vụ nào.</td></tr>`;
    services.forEach(svc => {
        let badgeClass = svc.status === 'Hoạt động' ? 'status-active' : 'status-inactive';
        tbody.innerHTML += `<tr>
            <td><strong>${svc.id}</strong></td><td>${svc.name}</td><td>${svc.category}</td><td>${svc.price.toLocaleString('vi-VN')}đ</td>
            <td><span class="status-badge ${badgeClass}">${svc.status}</span></td>
            <td><button class="btn-edit" onclick="showToast('Cập nhật dịch vụ','info')">Sửa</button><button class="btn-delete" onclick="showToast('Xóa dịch vụ','error')">Xóa</button></td>
        </tr>`;
    });
}

function searchAdminServices() {
    const kw = document.getElementById('admin-search-service-input').value.toLowerCase();
    const filtered = (JSON.parse(localStorage.getItem('hotel_services')) || []).filter(s => s.id.toLowerCase().includes(kw) || s.name.toLowerCase().includes(kw) || s.category.toLowerCase().includes(kw));
    renderAdminServices(filtered);
}

function renderAdminSettings() {
    let settings = JSON.parse(localStorage.getItem('hotel_settings'));
    if (settings) {
        document.getElementById('set-hotel-name').value = settings.name;
        document.getElementById('set-hotel-phone').value = settings.phone;
        document.getElementById('set-hotel-address').value = settings.address;
        document.getElementById('set-checkin-time').value = settings.checkin;
        document.getElementById('set-checkout-time').value = settings.checkout;
        document.getElementById('set-vat').value = settings.vat;
    }
}

function saveAdminSettings() {
    let settings = {
        name: document.getElementById('set-hotel-name').value,
        phone: document.getElementById('set-hotel-phone').value,
        address: document.getElementById('set-hotel-address').value,
        checkin: document.getElementById('set-checkin-time').value,
        checkout: document.getElementById('set-checkout-time').value,
        vat: document.getElementById('set-vat').value
    };
    localStorage.setItem('hotel_settings', JSON.stringify(settings));
    syncSettingsToUI(); showToast("Đã lưu Cài đặt hệ thống thành công!", "success");
}


// CHẠY HỆ THỐNG
initData(); 
renderRooms(); 
checkInitialState();
