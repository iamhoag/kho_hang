function themHang() {
    let ten = document.getElementById("ten").value;
    let sl = parseInt(document.getElementById("sl").value);
    let gia = parseFloat(document.getElementById("gia").value);
    
if (!ten || isNaN(sl) || isNaN(gia)) {
    alert("Nhập thiếu hoặc sai!");
    return;
}

    let kho = JSON.parse(localStorage.getItem("kho")) || [];

    let id = Date.now(); // tạo id unique

kho.push({id, ten, sl, gia});
    localStorage.setItem("kho", JSON.stringify(kho));

    loadData();
}

function xoaHang(index) {
    let kho = JSON.parse(localStorage.getItem("kho")) || [];

    kho.splice(index, 1);

    localStorage.setItem("kho", JSON.stringify(kho));

    loadData();
}

function loadData() {
    let kho = JSON.parse(localStorage.getItem("kho")) || [];

    let ds = document.getElementById("ds");
    ds.innerHTML = "";

    kho.forEach((item, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${item.ten} - SL: ${item.sl} - Giá: ${item.gia}
            <button onclick="xoaHang(${index})">Xóa</button>
        `;

        ds.appendChild(li);
    });
}

function xuatHang() {
    let id = parseInt(document.getElementById("idXuat").value);
    let slXuat = parseInt(document.getElementById("slXuat").value);

    let kho = JSON.parse(localStorage.getItem("kho")) || [];

    let found = false;
    let hoaDon = "";

    kho.forEach(item => {
        if (item.id === id) {
            found = true;

            if (slXuat <= item.sl) {
                item.sl -= slXuat;

                let tong = slXuat * item.gia;

                hoaDon = `
                    <h3>HÓA ĐƠN</h3>
                    <p>ID: ${item.id}</p>
                    <p>Tên hàng: ${item.ten}</p>
                    <p>Số lượng: ${slXuat}</p>
                    <p>Giá: ${item.gia}</p>
                    <p><b>Tổng tiền: ${tong}</b></p>
                `;
            } else {
                alert("Không đủ hàng!");
            }
        }
    });

    if (!found) {
        alert("Không tìm thấy hàng!");
    }

    localStorage.setItem("kho", JSON.stringify(kho));
    document.getElementById("hoadon").innerHTML = hoaDon;

    loadData();
}
