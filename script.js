// ===== STORAGE =====
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

    // reset input
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

// ===== XUẤT HÀNG =====
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

    // ===== HÓA ĐƠN + NÚT PDF =====
    let hoaDon = `
        <div id="printArea">
            <h2>HÓA ĐƠN</h2>
            <p><b>ID:</b> ${item.id}</p>
            <p><b>Tên:</b> ${item.ten}</p>
            <p><b>Số lượng:</b> ${slXuat}</p>
            <p><b>Giá:</b> ${item.gia}</p>
            <p><b>Tổng tiền:</b> ${tong}</p>
        </div>
        <button onclick="inHoaDon()">Xuất PDF</button>
    `;

    document.getElementById("hoadon").innerHTML = hoaDon;

    saveKho(kho);
    loadData();
}

// ===== IN / XUẤT PDF =====
function inHoaDon() {
    let content = document.getElementById("printArea").innerHTML;

    let win = window.open('', '', 'width=800,height=600');

    win.document.write(`
        <html>
        <head>
            <title>Hóa đơn</title>
            <style>
                body { font-family: Arial; padding: 20px; }
                h2 { color: #333; }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `);

    win.document.close();
    win.print();
}

// ===== HIỂN THỊ =====
function loadData() {
    let kho = getKho();

    let ds = document.getElementById("ds");
    ds.innerHTML = "";

    kho.forEach((item, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <b>ID:</b> ${item.id} | ${item.ten} | SL: ${item.sl} | Giá: ${item.gia}
            <button onclick="xoaHang(${index})">Xóa</button>
            <button onclick="xuatNhanh(${index})">Xuất</button>
        `;

        ds.appendChild(li);
    });
}

// ===== CHẠY =====
loadData();
