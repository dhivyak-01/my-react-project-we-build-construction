{/* <Col xs lg="12" className="custom-padding !bg-back2">
      <Card className="!bg-back ps-3" style={{ padding: "10px" }}>
        <div className="d-flex justify-content-between align-items-start">
          <h1 className="pt-1 text-25px mb-0">Carousel List</h1>
          <Button
            variant="danger"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            style={{ marginLeft: "10px" }}
          >
            <FaTrash />
          </Button>
        </div>
      </Card>
      <Table striped bordered hover style={{ marginTop: "47px" }}>
        <thead className="table-header">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selectedIds.length === message.length && message.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {carousels.map((carousel) => (
            <tr key={carousel._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(carousel._id)}
                  onChange={() => handleSelect(carousel._id)}
                />
              </td>
              <td>{carousel.id}</td>
              <td>{carousel.name}</td>
              <td>{carousel.isEnabled ? "Enabled" : "Disabled"}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(message)}>
                 edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(message._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}; */}
