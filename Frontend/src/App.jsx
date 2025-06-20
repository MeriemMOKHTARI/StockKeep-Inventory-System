import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import PermissionsPage from "./admin/permissions/PermissionsPage";
import Dashboard from "./admin/dashboard/Dashboard";
import store from "./admin/Store";
import RolesPage from "./admin/roles/RolesPage";
import SettingsPage from "./admin/settings/SettingsPage";
import UsersPage from "./admin/users/UsersPage";
import ConsumersPage from "./admin/consumers/ConsumersPage";
import StructurePage from "./admin/structures/StructuresPage";
import Login from "./authentification/Login";
import ForgetPassword from "./authentification/ForgetPassword";
import ResetPassword from "./authentification/ResetPassword";
import Achat from "./achat/dashboard/Dashboard";
import OrdersPage from "./achat/orders/OrdersPage";
import ChaptersPage from "./achat/chapters/ChaptersPage";
import ArticlesPage from "./achat/articles/ArticlesPage";
import SuppliersPage from "./achat/suppliers/SuppliersPage";
import ProductsPage from "./achat/products/ProductsPage";
import SettingsPageA from "./achat/settings/SettingsPage";
import Magasinier from "./magasinier/dashboard/Dashboard";
import ExternelOrdersPage from "./magasinier/ExternalOrders/ExternalOrdersPage";
import ReceiptsPage from "./magasinier/Receipts/ReceiptsPage";
import MovementSheetPage from "./magasinier/MovementSheet/MovementSheetPage";
import InventoryPage from "./magasinier/Inventory/Inventaire";
import InternalOrdersPage from "./magasinier/InternalOrders/InternalOrdersPage";
import ExitVouchersPage from "./magasinier/ExitVouchers/ExitVouchersPage";
import DischargeVouchersPage from "./magasinier/DischargeVouchers/DischargeVouchersPage";
import SettingsPageM from "./magasinier/settings/SettingsPageM";
import Cookies from "universal-cookie";
import Consumer from "./consumer/dashboard/Dashboard";
import InternalPage from "./consumer/internalOrder/InternalPage";
import SettingsPageC from "./consumer/settings/SettingsPage";
import Responsable from "./responsable/dashboard/Dashboard";
import InternalPageRespo from "./responsable/internalOrder/InternalPage";
import SettingsPageR from "./responsable/settings/SettingsPage";
import Director from "./Director/dashboard/Dashboard";
import InternalPageDirector from "./Director/internalOrder/InternalPage";
import Inventairee from "./Director/Inventory/Inventory";
import SettingsPageD from "./Director/settings/SettingsPage";

/*const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/",
  },

  {
    element: <ForgetPassword />,
    path: "/ForgetPassword",
  },

  {
    element: <ResetPassword />,
    path: "/ResetPassword/:uid/:token",
  },

  {
    element: (
      <AdminElement>
        <Dashboard search={false} index={0} />
      </AdminElement>
    ),
    path: "/dashboard",
  },
  {
    path: "/users",
    element: <UsersPage index={1} />,
  },
  {
    path: "/consumers",
    element: <ConsumersPage index={2} />,
  },
  {
    path: "/structures",
    element: <StructurePage index={3} />,
  },
  {
    path: "/roles",
    element: <RolesPage index={4} />,
  },
  {
    path: "/permissions",
    element: <PermissionsPage index={5} />,
  },
  {
    path: "/settings",
    element: <SettingsPage index={6} />,
  },
  {
    path: "/achat",
    element: <Achat index={0} search={false} />,
  },
  {
    element: <ChaptersPage index={1} search={true} />,
    path: "/chapters",
  },
  {
    element: <ArticlesPage index={2} search={true} />,
    path: "/articles",
  },
  {
    element: <ProductsPage index={3} search={false} />,
    path: "/products",
  },
  {
    element: <SuppliersPage index={4} search={true} />,
    path: "/suppliers",
  },
  {
    element: <OrdersPage index={5} search={true} />,
    path: "/orders",
  },
  {
    element: <SettingsPageA index={6} search={true} />,
    path: "/seettings",
  },
  {
    element: <Magasinier index={0} search={false} />,
    path: "/magasinier",
  },
  {
    element: <ExternelOrdersPage index={1} search={true} />,
    path: "/ExternalOrders",
  },
  {
    element: <ReceiptsPage index={2} search={true} />,
    path: "/Receipts",
  },
  {
    element: <MovementSheetPage index={3} search={true} />,
    path: "/MovementSheet",
  },
  {
    element: <InventoryPage index={4} search={true} />,
    path: "/Inventory",
  },
  {
    element: <InternalOrdersPage index={5} search={true} />,
    path: "/InternalOrders",
  },
  {
    element: <ExitVouchersPage index={6} search={true} />,
    path: "/ExitVouchers",
  },
  {
    element: <DischargeVouchersPage index={7} search={true} />,
    path: "/DischargeVouchers",
  },
  {
    element: <DischargeVouchersPage index={7} search={true} />,
    path: "/DischargeVouchers",
  },
  {
    element: <SettingsPageM index={8} search={true} />,
    path: "/SettingsMagasinier",
  },
]);*/
const cookies = new Cookies();
function AppRouting() {
  const { role } = useSelector((state) => state.user);
  const rolee = cookies.get("role");
  let router;
  router = createBrowserRouter([
    {
      element: <Login />,
      path: "/",
    },
    {
      element: <ForgetPassword />,
      path: "/ForgetPassword",
    },

    {
      element: <ResetPassword />,
      path: "/ResetPassword/:uid/:token",
    },

    {
      element: (
        <AdminElement role={rolee}>
          <Dashboard search={false} index={0} />
        </AdminElement>
      ),
      path: "/dashboard",
    },
    {
      path: "/users",
      element: (
        <AdminElement role={rolee}>
          <UsersPage index={1} />
        </AdminElement>
      ),
    },
    {
      path: "/consumers",
      element: (
        <AdminElement role={rolee}>
          <ConsumersPage index={2} />
        </AdminElement>
      ),
    },
    {
      path: "/structures",
      element: (
        <AdminElement role={rolee}>
          {" "}
          <StructurePage index={3} />{" "}
        </AdminElement>
      ),
    },
    {
      path: "/roles",
      element: (
        <AdminElement role={rolee}>
          <RolesPage index={4} />{" "}
        </AdminElement>
      ),
    },
    {
      path: "/permissions",
      element: (
        <AdminElement role={rolee}>
          {" "}
          <PermissionsPage index={5} />{" "}
        </AdminElement>
      ),
    },
    {
      path: "/settings",
      element: (
        <AdminElement role={rolee}>
          <SettingsPage index={6} />
        </AdminElement>
      ),
    },
    {
      path: "/achat",
      element: (
        <AchatElement role={rolee}>
          <Achat index={0} search={false} />
        </AchatElement>
      ),
    },
    {
      path: "/achat",
      element: (
        <AchatElement role={rolee}>
          {" "}
          <Achat index={0} search={false} />
        </AchatElement>
      ),
    },
    {
      element: (
        <AchatElement role={rolee}>
          {" "}
          <ChaptersPage index={1} search={true} />
        </AchatElement>
      ),
      path: "/chapters",
    },
    {
      element: (
        <AchatElement role={rolee}>
          <ArticlesPage index={2} search={true} />
        </AchatElement>
      ),
      path: "/articles",
    },
    {
      element: (
        <AchatElement role={rolee}>
          <ProductsPage index={3} search={true} />
        </AchatElement>
      ),
      path: "/products",
    },
    {
      element: (
        <AchatElement role={rolee}>
          <SuppliersPage index={4} search={true} />{" "}
        </AchatElement>
      ),
      path: "/suppliers",
    },
    {
      element: (
        <AchatElement role={rolee}>
          <OrdersPage index={5} search={true} />{" "}
        </AchatElement>
      ),
      path: "/orders",
    },
    {
      element: (
        <AchatElement role={rolee}>
          <SettingsPageA index={6} search={false} />{" "}
        </AchatElement>
      ),
      path: "/seettings",
    },
    {
      element: (
        <MagasinierElement role={rolee}>
          {" "}
          <Magasinier index={0} />
        </MagasinierElement>
      ),
      path: "/magasinier",
    },
    {
      element: (
        <MagasinierElement role={rolee}>
          <DischargeVouchersPage index={7} search={true} />
        </MagasinierElement>
      ),
      path: "/DischargeVouchers",
    },
    {
      element: (
        <MagasinierElement role={rolee}>
          {" "}
          <ExternelOrdersPage index={1} search={true} />{" "}
        </MagasinierElement>
      ),
      path: "/ExternalOrders",
    },
    {
      element: (
        <MagasinierElement role={rolee}>
          {" "}
          <ReceiptsPage index={2} search={true} />{" "}
        </MagasinierElement>
      ),
      path: "/Receipts",
    },
    {
      element: (
        <MagasinierElement role={rolee}>
          {" "}
          <MovementSheetPage index={3} search={true} />{" "}
        </MagasinierElement>
      ),
      path: "/MovementSheet",
    },
    {
      element: (
        <MagasinierElement role={rolee}>
          <InventoryPage index={4} search={true} />
        </MagasinierElement>
      ),
      path: "/Inventory",
    },
    {
      element: (
        <MagasinierElement role={rolee}>
          {" "}
          <InternalOrdersPage index={5} search={true} />
        </MagasinierElement>
      ),
      path: "/InternalOrders",
    },
    {
      element: (
        <MagasinierElement role={rolee}>
          <ExitVouchersPage index={6} search={true} />
        </MagasinierElement>
      ),
      path: "/ExitVouchers",
    },

    {
      element: (
        <MagasinierElement role={rolee}>
          {" "}
          <DischargeVouchersPage index={7} search={true} />
        </MagasinierElement>
      ),
      path: "/DischargeVouchers",
    },
    {
      element: (
        <MagasinierElement role={rolee}>
          {" "}
          <SettingsPageM index={8} search={true} />
        </MagasinierElement>
      ),
      path: "/Seeettings",
    },
    {
      element: (
        <ConsumerElement role={rolee}>
          <Consumer index={0} search={false} />
        </ConsumerElement>
      ),
      path: "/consumer",
    },
    {
      element: (
        <ConsumerElement role={rolee}>
          <InternalPage index={1} search={true} />
        </ConsumerElement>
      ),
      path: "/InternalOrder",
    },
    {
      element: (
        <ConsumerElement role={rolee}>
          <SettingsPageC index={2} search={false} />
        </ConsumerElement>
      ),
      path: "/SettingsConsumer",
    },
    {
      element: (
        <ResponsableElement role={rolee}>
          <Responsable index={0} search={false} />
        </ResponsableElement>
      ),
      path: "/responsable",
    },
    {
      element: (
        <ResponsableElement role={rolee}>
          <SettingsPageR index={2} search={false} />
        </ResponsableElement>
      ),
      path: "/settingsResponsable",
    },
    {
      element: (
        <ResponsableElement role={rolee}>
          <InternalPageRespo index={1} search={false} />
        </ResponsableElement>
      ),
      path: "/rInternalOrder",
    },
    {
      element: (
        <DirectorElement role={rolee}>
          <Director index={0} search={false} />
        </DirectorElement>
      ),
      path: "/director",
    },
    {
      element: (
        <DirectorElement role={rolee}>
          <InternalPageDirector index={1} search={true} />
        </DirectorElement>
      ),
      path: "/DInternalOrder",
    },
    {
      element: (
        <DirectorElement role={rolee}>
          <Inventairee index={2} search={true} />
        </DirectorElement>
      ),
      path: "/DInventory",
    },
    {
      element: (
        <DirectorElement role={rolee}>
          <SettingsPageD index={3} search={false} />
        </DirectorElement>
      ),
      path: "/Dsettings",
    },
  ]);

  return <RouterProvider router={router} />;
}

function AdminElement({ children, role }) {
  if (role === "admin") return <>{children}</>;
  else
    return (
      <p className="text-[2rem] font-poppins font-medium m-6">
        You can 't access this page
      </p>
    );
}

function AchatElement({ children, role }) {
  if (role === "agent du service achat") return <>{children}</>;
  else
    return (
      <p className="text-[2rem] font-poppins font-mediu m-6">
        You can 't access this page
      </p>
    );
}

function MagasinierElement({ children, role }) {
  if (role === "magasinier") return <>{children}</>;
  else
    return (
      <p className="text-[2rem] font-poppins font-mediu m-6">
        You can 't access this page
      </p>
    );
}

function ConsumerElement({ children, role }) {
  if (role === "consommateur") return <>{children}</>;
  else
    return (
      <p className="text-[2rem] font-poppins font-mediu m-6">
        You can 't access this page
      </p>
    );
}

function ResponsableElement({ children, role }) {
  if (role === "responsable_structure") return <>{children}</>;
  else
    return (
      <p className="text-[2rem] font-poppins font-mediu m-6">
        You can 't access this page
      </p>
    );
}

function DirectorElement({ children, role }) {
  if (role === "directeur") return <>{children}</>;
  else
    return (
      <p className="text-[2rem] font-poppins font-mediu m-6">
        You can 't access this page
      </p>
    );
}

/*function MagasinierElement({ children, role }) {
  if (role === "stockkeeper") return <>{children}</>;
  else
    return (
      <p className="text-[2rem] font-poppins m-6">
        You can 't access this page
      </p>
    );
}*/
function App() {
  return (
    <Provider store={store}>
      {/*<RouterProvider router={router} />*/}
      <AppRouting />
    </Provider>
  );
}

export default App;
