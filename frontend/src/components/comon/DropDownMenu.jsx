import React from 'react'

function DropDownMenu({ dropDownMenu, logoutHandle, setActiveComponent, setDropDownMenu , dropMenu}) {
    

    return (
        <div>
            {dropDownMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md overflow-hidden z-50">
                    <ul className="flex flex-col text-sm text-gray-700">
                        {dropMenu.map((menu) => (
                            <li
                                key={menu.name}
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => {
                                    if (menu.name === "Logout") {
                                        logoutHandle();
                                    } else {
                                        setActiveComponent(menu.component);
                                    }
                                    setDropDownMenu(false);
                                }}
                            >
                                {menu.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default DropDownMenu