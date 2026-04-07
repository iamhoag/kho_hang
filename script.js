// ===== LOAD KHO =====
function getKho() {
    return JSON.parse(localStorage.getItem("kho")) || [];
}

function saveKho(kho) {
    localStorage.setItem("kho", JSON.stringify(kho));
}

// ===== THÊM HÀNG =====
function themHang() {
    let ten = document.getElementById("ten").value.trim();
    let sl = parseInt(document.getElementById("sl").value);
    let gia = parseFloat(document.getElementById("gia").value);

    if (!ten || isNaN(sl) || isNaN(gia)) {
        alert("Nhập thiếu hoặc sai!");
        return;
    }

    let kho = getKho();

    let id = Date.now();

    kho.push({ id, ten, sl, gia });

    saveKho(kho);

    // reset input cho đỡ bực
    document.getElementById("ten").value = "";
    document.getElementById("sl").value = "";
    document.getElementById("gia").value = "";

    loadData();
}

// ===== XÓA =====
function xoaHang(index) {
    let kho = getKho();

    kho.splice(index, 1);

    saveKho(kho);
    loadData();
}

// ===== XUẤT NHANH (KHÔNG CẦN NHẬP ID) =====
function xuatNhanh(index) {
    let kho = getKho();

    let slXuat = parseInt(prompt("Nhập số lượng xuất:"));

    if (isNaN(slXuat) || slXuat <= 0) {
        alert("Sai số lượng!");
        return;
    }

    let item = kho[index];

    if (slXuat > item.sl) {
        alert("Không đủ hàng!");
        return;
    }

    item.sl -= slXuat;

    let tong = slXuat * item.gia;

    let hoaDon = `
        <h3>HÓA ĐƠN</h3>
        <p>Tên: ${item.ten}</p>
        <p>Số lượng: ${slXuat}</p>
        <p>Giá: ${item.gia}</p>
        <p><b>Tổng tiền: ${tong}</b></p>
    `;

    document.getElementById("hoadon").innerHTML = hoaDon;

    saveKho(kho);
    loadData();
}

// ===== HIỂN THỊ =====
function loadData() {
    let kho = getKho();

    let ds = document.getElementById("ds");
    ds.innerHTML = "";

    kho.forEach((item, index) => {
        let li = document.createElement("li");

       li.innerHTML = `
    ID: ${item.id} - ${item.ten} - SL: ${item.sl} - Giá: ${item.gia}
    <button onclick="xoaHang(${index})">Xóa</button>
    <button onclick="xuatNhanh(${index})">Xuất</button>
`;

        ds.appendChild(li);
    });
}

// ===== CHẠY =====
loadData();
