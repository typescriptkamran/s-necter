import {PropsWithChildren} from "react";

const Layout = ({children}: PropsWithChildren) => {
    return (
      <div>
          <p className="text-3xl  font-bold text-natural-charcoal">Translations</p>
          {children}
      </div>
    )
}
export default Layout;