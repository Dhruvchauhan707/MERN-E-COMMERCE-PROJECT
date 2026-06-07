const AddressModal = ({
  showModal,
  setShowModal,
  formData,
  setFormData,
  editingAddress,
  handleSubmit,
}) => {

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="address-modal">

        <h2>
          {editingAddress ? "Edit Address" : "Add Address"}
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({
              ...formData,
              fullName: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({
              ...formData,
              address: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) =>
            setFormData({
              ...formData,
              city: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={(e) =>
            setFormData({
              ...formData,
              postalCode: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={(e) =>
            setFormData({
              ...formData,
              country: e.target.value,
            })
          }
        />

        <div className="modal-buttons">
          <button onClick={handleSubmit}>
            {editingAddress ? "Update" : "Save"}
          </button>

          <button onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddressModal;