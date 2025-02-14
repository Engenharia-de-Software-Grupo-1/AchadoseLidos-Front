import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import "primeicons/primeicons.css";
import "./style.css"

interface HeaderProps {
  simpleHeader: boolean;
}

export default function Header({ simpleHeader }: HeaderProps) {
  let content = <></>;

  if (simpleHeader) {
    content = (
      <div className="simple-header">
        <img
          alt="logo"
          src="/images/logo.png"
          height="40"
          className="ml-2 mr-4"
        ></img>
      </div>
    );
  } else {
    const itemRenderer = (item: any) => (
      <a
        className="flex align-items-center p-menuitem-link"
        style={{ backgroundColor: "#2F292A" }}
      >
        <span className="mx-2" style={{ color: "#2F292A" }}>
          {item.label}
        </span>
      </a>
    );
    const items = [
      {
        label: "Categorias",
        items: [
          {
            label: "Livros",
            template: itemRenderer,
          },
          {
            label: "Discos",
            template: itemRenderer,
          },
        ],
      },
    ];

    const start = (
      <>
        <img
          alt="logo"
          src="/images/logo.png"
          height="40"
          className="ml-2 mr-4"
        ></img>
        ;
      </>
    );
    const end = (
      <div className="flex align-items-center">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText
            placeholder="Search"
            type="text"
            style={{ width: "55rem", height: "2.5rem" }}
          />
        </IconField>

        <div className="flex align-items-center gap-4 justify-center">
          <Button
            icon="pi pi-heart"
            rounded
            text
            aria-label="Favoritos"
            style={{ color: "#F5ECDD" }}
          />
          <Button
            icon="pi pi-shopping-bag"
            rounded
            text
            aria-label="Cesta"
            style={{ color: "#F5ECDD" }}
          />
          <Avatar
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </div>
    );

    content = (
      <Menubar
        model={items}
        start={start}
        end={end}
        style={{ background: "#2F292A", border: "none", borderRadius: "0%" }}
      />
    );
  }

  return content;
}
