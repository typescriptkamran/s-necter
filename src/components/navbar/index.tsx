import NavBar, { NavBarProps } from "./client"

const NavBarWrapper = ({shouldAnimate = false}: NavBarProps) => {
    return (
        <NavBar shouldAnimate={shouldAnimate}/>
    )
}
export default NavBarWrapper
