import { Card, Typography, Button } from "@material-tailwind/react";
import modifyIcon from "../../assets/modifyIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import Filters from "../../assets/Filters.png";
import { useState, useEffect } from "react";
import CreateArticle from "./CreateArticle";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axiosInstance from "../../Services/AxiosInstance";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import UpdateArticle from "./UpdateArticle";

const TABLE_HEAD = [
  { name: "ID" },
  { name: "Name" },
  { name: "Chapter" },
  { name: "TVA" },
  { name: "More" },
];

function ArticlesTable() {
  const { searchQuery, articles } = useSelector((state) => state.achat);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [updatedArticles, setUpdatedArticles] = useState(articles);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/service-achat/Article/listcreate/"
        );
        setUpdatedArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchArticles(dispatch, articles);
  }, [articles, dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <>
      <main
        className="table-container m-4 h-screen rounded-[11px]"
        style={{ borderRadius: "20px !important", backgroundColor: "#ffffff" }}
      >
        <Card
          className="h-full w-full overflow-auto rounded-[11px]"
          style={{ borderRadius: "20px !important" }}
        >
          <div className="ml-8 mr-12 mt-4 mb-8 flex items-center justify-between gap-8 ">
            <Typography
              color="blue-gray"
              style={{
                fontSize: "24px",
                color: "#444",
                fontFamily: "Poppins",
                fontWeight: 600,
              }}
            >
              Articles
            </Typography>
            <div className="flex items-center">
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  padding: "8px",
                  marginLeft: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ borderRadius: "10px", border: "1px solid #D0D3D9" }}
                >
                  <Button
                    className="flex items-center gap-3 p-[8px]"
                    style={{
                      color: "#5D6679",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    <img src={Filters} alt="FilterIcon" className="h-6 w-6" />
                    Filters
                  </Button>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#2185D5",
                  borderRadius: "10px",
                  marginLeft: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CreateArticle
                  open={open}
                  handleClose={handleClose}
                  setOpen={setOpen}
                >
                  <Button
                    className="flex items-center gap-3 p-[8px]"
                    onClick={handleClickOpen}
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    <ShoppingBasketIcon className="h-6 w-6" />
                    New article
                  </Button>
                </CreateArticle>
              </div>
            </div>
          </div>
          <table
            className="w-full min-w-max table-auto text-left  overflow-auto 
          max-h-screen"
            style={{ fontSize: "14px", fontFamily: "Poppins", fontWeight: 100 }}
          >
            <thead className="relative z-[2] w-full bg-blue-gray-50">
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={index}
                    className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 sticky top-0
                    ${index === 0 ? "pl-20 pr-0 max-w-[150px]" : ""}
                    ${index === 1 ? "pl-32 pr-2 text-center max-w-[250px]" : ""}
                    ${index === 2 ? " pr-20 text-center max-w-[250px]" : ""}
                    ${index === 3 ? "  pr-0 text-center pl-20" : ""}
                    ${index === 4 ? "pl-0 min-w-[260px] text-right pr-48" : ""}
                  bg-slate-100`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                      style={{ fontFamily: "Poppins", fontWeight: 600 }}
                    >
                      {head.name}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {updatedArticles
                .filter(
                  (article) =>
                    article.id
                      ?.toString()
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase()) ||
                    article.designation
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase()) ||
                    article.chapitre
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase()) ||
                    article.tva
                      .toLowerCase()
                      .startsWith(searchQuery.toLowerCase())
                )
                .map((article) => (
                  <tr key={article.id}>
                    <td className={`p-4 pl-20 pr-0 max-w-[150px]`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#48505E",
                        }}
                      >
                        {article.id}
                      </Typography>
                    </td>
                    <td className={`p-4 pr-2 pl-32 text-center max-w-[250px]`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#48505E",
                        }}
                      >
                        {article.designation}
                      </Typography>
                    </td>
                    <td className={`p-4 text-center max-w-[250px]`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#48505E",
                        }}
                      >
                        {article.chapitre}
                      </Typography>
                    </td>
                    <td className={`p-4 text-right pr-10 pl-14`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#48505E",
                        }}
                      >
                        {article.tva}
                      </Typography>
                    </td>

                    <td className={"p-4 pl-0 text-right pr-44 min-w-[260px]"}>
                      <div className="flex justify-end">
                        <UpdateArticle
                          open={openUpdate}
                          handleClose={handleCloseUpdate}
                          setOpen={setOpenUpdate}
                          id={selectedArticle}
                        >
                          <button
                            className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center mr-[1px]"
                            style={{ borderColor: "#D0D3D9" }}
                            onClick={() => {
                              handleClickOpenUpdate();
                              setSelectedArticle(article.id);
                            }}
                          >
                            <img
                              src={modifyIcon}
                              alt="Modify"
                              className="h-5 w-5"
                            />
                          </button>
                        </UpdateArticle>
                        <ConfirmDelete
                          open={openD}
                          handleClose={handleCloseD}
                          setOpen={setOpenD}
                          id={selectedArticle}
                          concern="article"
                        >
                          <button
                            className="bg-white border border-blue-500 rounded-[6px] w-10 h-10 flex items-center justify-center "
                            style={{
                              borderColor: "#D0D3D9",
                              marginLeft: "3px",
                            }}
                            onClick={() => {
                              handleClickOpenD();
                              setSelectedArticle(article.id);
                            }}
                          >
                            <img
                              src={deleteIcon}
                              alt="Delete"
                              className="h-5 w-5"
                            />
                          </button>
                        </ConfirmDelete>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>
      </main>
    </>
  );
}

export default ArticlesTable;
