const logo = new URL("../assets/logo.png", import.meta.url);

export function Logo({ width = "w-20", ml = "ml-28" }) {
  return <img src={logo} className={`xl:${ml} ${width}`} alt="logo" />;
}

const error404 = new URL("../assets/Error404.gif", import.meta.url);

export function Error404({ width = "w-[40rem]", height = "h-[25rem]" }) {
  return (
    <div className="flex items-center justify-center h-25">
      <img src={error404} className={`${width} xl:${height}}`} alt="Error404" />
    </div>
  );
}

const ec = new URL("../assets/EmptyCart.png", import.meta.url);

export function EmptyCartImage({
  width = "h-auto]",
  height = " w-auto",
  ml = "ml-auto",
}) {
  return (
    <img
      src={ec}
      className={`xl:${ml} ${width} ${height} object-cover`}
      alt="EmptyCart"
    />
  );
}

const lg = new URL("../assets/Loading.gif", import.meta.url);

export function LoadingImg({ width = "w-[30rem]", height = "h-[25rem]" }) {
  return (
    <div className="flex items-center justify-center h-auto  ">
      <img src={lg} className={`${width} xl:${height}}`} alt="Error404" />
    </div>
  );
}
