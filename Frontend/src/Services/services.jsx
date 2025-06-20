import axiosInstance from "./AxiosInstance";

async function fetchUsers() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/user/listcreate/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

async function fetchConsumers() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/consom/listcreate/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching consumers data:", error);
  }
}

async function fetchStructures() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/structure/listcreate/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching structures data:", error);
  }
}

async function fetchRoles() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/role/listcreate/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching roles data:", error);
  }
}

async function fetchPermissions() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/role/listcreatep/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions data:", error);
  }
}

async function fetchChapters() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/service-achat/Chapitre/listcreate"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters data:", error);
  }
}

async function fetchArticles() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/service-achat/Article/listcreate"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching articles data:", error);
  }
}

async function fetchProducts() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/service-achat/Produit/listcreate"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products data:", error);
  }
}

async function fetchSuppliers() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/fournisseur/listcreate"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers data:", error);
  }
}

async function fetchbondecommande() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/service-achat/bondecommande/listcreate/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bon de commande data:", error);
  }
}

async function fetchOrders() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/consom/bondecommandeinterne/listcreate/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching orders data:", error);
  }
}

async function fetchOrdersResponsable() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/responsable/bondecommandeinterne/list/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching orders data:", error);
  }
}

async function fetchReceipts() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/magasinier/bondereception/list/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching receipts data:", error);
  }
}

async function fetchStats() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/magasinier/etatinventaire/listcreate/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching status data:", error);
  }
}

async function fetchInternal() {
  try {
    const response = await axiosInstance.get(
      "http://127.0.0.1:8000/consom/bondecommandeinterne/listcreate/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bon de commande internes data:", error);
  }
}

export {
  fetchUsers,
  fetchConsumers,
  fetchRoles,
  fetchPermissions,
  fetchStructures,
  fetchChapters,
  fetchArticles,
  fetchProducts,
  fetchSuppliers,
  fetchbondecommande,
  fetchOrders,
  fetchOrdersResponsable,
  fetchReceipts,
  fetchStats,
  fetchInternal,
};
