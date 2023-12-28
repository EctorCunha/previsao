import loading from "../../assets/loading.svg"

export function Loading(){
  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
    }}>
        <img src={loading} alt="spinner carregando a página" />
    </div>
  );
}
