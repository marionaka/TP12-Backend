function addToCart(pid) {
  const cid = document.getElementById("cartId").value;
  fetch(`/api/carts/${cid}/product/${pid}`, {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        Swal.fire({
          text: `Producto agregado al carrito!`,
          toast: true,
          icon: "success",
          position: "bottom-right",
        });
      } else {
        Swal.fire({
          text: `Error al agregar el producto al carrito.`,
          icon: "error",
          toast: true,
          position: "bottom-right",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}