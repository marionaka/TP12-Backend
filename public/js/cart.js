function deleteFromCart(pid) {
  const cid = document.getElementById("cartId").value;
  const url = `/api/carts/${cid}/product/${pid}`;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
      } else {
        console.log("Failed to remove product from cart");
      }
    })
    .catch((error) => {
      console.log("Error occurred while removing product from cart:", error);
    });
}

function endPurchase (){
    const cid = document.getElementById("cartId").value;
    const url = `/api/carts/${cid}/purchase`;
    fetch(url, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          setTimeout(()=>{
            location.reload();
          }, 800)
        } else {
          console.log("Error al obtener response para finalizar compra");
        }
      })
      .catch((err) => {
        console.log("Error interno al finalizar compra:", err);
      });
  }