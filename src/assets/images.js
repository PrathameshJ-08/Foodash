// --------foodash logo------------------
const logo = new URL("./Images/logo.png", import.meta.url);
export function Logo({ width = "w-20", ml = "ml-28" }) {
  return <img src={logo} className={`xl:${ml} ${width}`} alt="logo" />;
}

// --------error page gif------------------
const error404 = new URL("./Images/Error404.gif", import.meta.url);
export function Error404({ width = "w-[40rem]", height = "h-[25rem]" }) {
  return (
    <div className="flex items-center justify-center h-25">
      <img src={error404} className={`${width} xl:${height}}`} alt="Error404" />
    </div>
  );
}

// --------empty cart img------------------
const ec = new URL("./Images/EmptyCart.png", import.meta.url);
export function EmptyCartImage({
  width = "w-auto",
  height = " h-auto",
  ml = "ml-auto",
}) {
  return (
    <div className="flex items-center justify-center h-auto  ">
      <img
        src={ec}
        className={`xl:${ml} ${width} ${height} object-cover `}
        alt="EmptyCart"
      />
    </div>
  );
}

// --------shimmer loading gif------------------
const lg = new URL("./Images/Loading.gif", import.meta.url);
export function LoadingImg({ width = "w-[30rem]", height = "h-[25rem]" }) {
  return (
    <div className="flex items-center justify-center h-auto  overflow-hidden">
      <img src={lg} className={`${width} xl:${height}}`} alt="shimmer" />
    </div>
  );
}

// --------order placed gif------------------
const order = new URL("./Images/OrderPlaced.gif", import.meta.url);
export function OrderImg({ width = "w-[32rem]" }) {
  return (
    <div className="flex items-center justify-center h-auto  ">
      <img src={order} className={`${width} }`} alt="OrderImg" loop={false} />
    </div>
  );
}

// --------no menu item image------------------
const noImg = new URL("./Images/NoImg.png", import.meta.url);
export function NoImage() {
  return (
    <div className="w-32 h-32 object-cover rounded-2xl p-2 opacity-20">
      <img src={noImg} alt="NoImage" />
    </div>
  );
}

// --------home top image------------------
const headerImg = new URL("./Images/HomeIMG.jpg", import.meta.url);
export function HeaderImg({ mt = "-mt-8" }) {
  return (
    <div className="lg:hidden overflow-hidden">
      <img src={headerImg} alt="headerImg" className={`${mt}`} />
    </div>
  );
}
