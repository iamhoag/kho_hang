async function themHang() {
    let ten = document.getElementById("ten").value;
    let sl = document.getElementById("sl").value;
    let gia = document.getElementById("gia").value;

    await fetch("http://127.0.0.1:5000/them", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ten, sl, gia})
    });

    loadData();
}

async function loadData() {
    let res = await fetch("http://127.0.0.1:5000/ds");
    let data = await res.json();

    let ds = document.getElementById("ds");
    ds.innerHTML = "";

    data.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.ten} - SL: ${item.sl} - Giá: ${item.gia}`;
        ds.appendChild(li);
    });
}

loadData();
