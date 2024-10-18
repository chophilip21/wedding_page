import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { FaSort } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const GuestManagement = ({ guests, setGuests }) => {
  const [activeSubTab, setActiveSubTab] = useState("view-guests-list");
  const [selectedGuest, setSelectedGuest] = useState(null);

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "view-guests-list":
        return (
          <ViewGuestsList
            guests={guests}
            setGuests={setGuests}
            setActiveSubTab={setActiveSubTab}
            setSelectedGuest={setSelectedGuest}
          />
        );
      case "edit-add-guest":
        return (
          <EditAddGuest
            guests={guests}
            setGuests={setGuests}
            selectedGuest={selectedGuest}
            setSelectedGuest={setSelectedGuest}
          />
        );
      case "manage-relationships":
        return <ManageRelationships />;
      default:
        return (
          <ViewGuestsList
            guests={guests}
            setGuests={setGuests}
            setActiveSubTab={setActiveSubTab}
            setSelectedGuest={setSelectedGuest}
          />
        );
    }
  };

  return (
    <div className="w-full flex flex-col jusify-start items-start">
      <h4 className="font-sans text-neutral-600 font-bold mb-4 text-left">
        Guest Management
      </h4>

      <div className=" w-full flex justify-start flex-wrap gap-2 md:gap-4">
        <button
          onClick={() => setActiveSubTab("view-guests-list")}
          className={`h-6 p-2 max-sm:text-sm flex justify-center items-center rounded font-semibold 
      ${
        activeSubTab === "view-guests-list"
          ? "bg-slate-700 text-white"
          : "bg-transparent border border-slate-700 text-black"
      }`}
        >
          View Guests List
        </button>
        <button
          onClick={() => setActiveSubTab("edit-add-guest")}
          className={`h-6 p-2 max-sm:text-sm flex justify-center items-center rounded font-semibold 
      ${
        activeSubTab === "edit-add-guest"
          ? "bg-slate-700 text-white"
          : "bg-transparent border border-slate-700 text-black"
      }`}
        >
          Edit/Add Guest
        </button>
        <button
          onClick={() => setActiveSubTab("manage-relationships")}
          className={`h-6 p-2 max-sm:text-sm flex justify-center items-center rounded font-semibold 
      ${
        activeSubTab === "manage-relationships"
          ? "bg-slate-700 text-white"
          : "bg-transparent border border-slate-700 text-black"
      }`}
        >
          Manage Relationships
        </button>
      </div>

      {renderSubTabContent()}
    </div>
  );
};

export default GuestManagement;

const ViewGuestsList = ({
  guests,
  setGuests,
  setActiveSubTab,
  setSelectedGuest,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("id");
  const [guestsList, setGuestsList] = useState(guests);

  const handleEditGuest = (guest) => {
    setSelectedGuest(guest); // Set the selected guest for editing
    setActiveSubTab("edit-add-guest"); // Switch to edit form
  };

  // Function to delete the guest and update the state
  const handleDeleteGuest = async (guestId) => {
    await deleteGuest(guestId);
    // Update the local guest list after deletion
    const updatedGuests = guestsList.filter((guest) => guest.id !== guestId);
    setGuestsList(updatedGuests);
    setGuests(updatedGuests);
  };

  const deleteGuest = async (guestId) => {
    try {
      // Get the document reference for the guest
      const guestDocRef = doc(db, "guests", String(guestId));

      // Delete the document
      await deleteDoc(guestDocRef);

      console.log(`Guest with ID ${guestId} deleted successfully`);

      alert(`Guest deleted successfully`);
    } catch (error) {
      console.error("Error deleting guest:", error);
      alert(`Error deleting the guests`);
    }
  };

  // Filter and sort guests based on search term and sort option
  const filteredGuests = guestsList
    .filter((guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "id":
          return a.id - b.id;
        case "name":
          return a.name.localeCompare(b.name);
        case "name-reverse":
          return b.name.localeCompare(a.name);
        case "karolina":
          return a.guestSide === "Karolina" && b.guestSide !== "Karolina"
            ? -1
            : 1;
        case "emanuele":
          return a.guestSide === "Emanuele" && b.guestSide !== "Emanuele"
            ? -1
            : 1;
        case "status-yes":
          return a.attending === "Yes" && b.attending !== "Yes" ? -1 : 1;
        case "status-no":
          return a.attending === "No" && b.attending !== "No" ? -1 : 1;
        case "status-unknown":
          return a.attending === "Unknown" && b.attending !== "Unknown"
            ? -1
            : 1;
        default:
          return 0;
      }
    });

  return (
    <div className="w-full flex flex-col jusify-start items-start mt-4">
      {guestsList.length === 0 ? (
        <p>Fetching...</p>
      ) : (
        <>
          <div className="w-full flex gap-2 justify-between flex-wrap border-b pb-4 mb-4">
            {/* Search bar */}
            <div className="w-full max-w-[400px] flex gap-2 items-center justify-center">
              <FaSearch className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px] text-neutral-600" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search guests by name"
                className="max-sm:h-[33px] border  sm:p-2 w-full focus:outline-none focus:ring-0"
              />
            </div>

            {/* Sort options */}
            <div className="w-full max-w-[400px] flex gap-2 items-center justify-center">
              <FaSort className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px] text-neutral-600" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border p-1 sm:p-2 focus:outline-none focus:ring-0"
              >
                <option value="id" className="max-sm:text-[15px]">
                  Sort by ID
                </option>
                <option value="name" className="max-sm:text-[15px]">
                  Sort by Name {"("}A-Z{")"}
                </option>
                <option value="name-reverse" className="max-sm:text-[15px]">
                  Sort by Name {"("}Z-A{")"}
                </option>
                <option value="karolina" className="max-sm:text-[15px]">
                  Sort by Karolina&apos;s Side
                </option>
                <option value="emanuele" className="max-sm:text-[15px]">
                  Sort by Emanuele&apos;s Side
                </option>
                <option value="status-yes" className="max-sm:text-[15px]">
                  Sort by Status: Yes
                </option>
                <option value="status-no" className="max-sm:text-[15px]">
                  Sort by Status: No
                </option>
                <option value="status-unknown" className="max-sm:text-[15px]">
                  Sort by Status: Unknown
                </option>
              </select>
            </div>
          </div>

          {/* Guest list */}
          <ul className="w-full border rounded max-h-[650px] sm:max-h-[500px] overflow-y-auto pr-8">
            {filteredGuests.map((guest) => (
              <li
                key={guest.id}
                className="w-full flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center border-b last:border-b-0  sm:gap-12 "
              >
                <div className="flex">
                  <div className="flex">
                    <p className="font-sans font-semibold p-2 bg-neutral-200">
                      {guest.id}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start p-3">
                    <div className=" flex gap-2 items-center">
                      <h6 className="font-sans max-sm:text-base  bg-orange-200 p-1 sm:p-2 text-left">
                        {guest.name}
                      </h6>
                      <div
                        className={`w-6 h-6 rounded-full ${
                          guest.attending === "No"
                            ? "bg-red-500"
                            : guest.attending === "Yes"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      />
                    </div>

                    <p className="font-sans max-sm:text-sm text-left max-sm:mb-[5px]">
                      <span className="font-semibold">Attending:</span>{" "}
                      {guest.attending}
                    </p>
                    <p className="font-sans max-sm:text-sm text-left max-sm:mb-[5px]">
                      <span className="font-semibold">Side:</span>{" "}
                      {guest.guestSide}
                    </p>
                    <p className="font-sans max-sm:text-sm text-left max-sm:mb-[5px]">
                      <span className="font-semibold">Note:</span>{" "}
                      {guest.note.length === 0 ? "" : guest.note}
                    </p>
                  </div>
                </div>
                <div className="max-sm:w-full flex flex-row sm:flex-col gap-2 max-sm:mb-4 max-sm justify-between">
                  <button
                    onClick={() => handleEditGuest(guest)}
                    className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full bg-cyan-600 flex flex-grow justify-center items-center"
                  >
                    <FaUserEdit
                      color="white"
                      className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px]"
                    />
                  </button>

                  <AlertDialog>
                    <AlertDialogTrigger className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full bg-red-600 flex flex-grow justify-center items-center">
                      <RiDeleteBin5Fill
                        color="white"
                        className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px]"
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This guest will be removed from the list
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteGuest(guest.id)}
                        >
                          Delete Guest
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const EditAddGuest = ({
  selectedGuest,
  setSelectedGuest,
  setGuests,
  guests,
}) => {
  const [name, setName] = useState(selectedGuest?.name || "");
  const [guestSide, setGuestSide] = useState(selectedGuest?.guestSide || "");
  const [attending, setAttending] = useState(selectedGuest?.attending || "");
  const [note, setNote] = useState(selectedGuest?.note || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedGuest) {
      // Edit mode
      try {
        const guestDocRef = doc(db, "guests", String(selectedGuest.id));
        await updateDoc(guestDocRef, { name, guestSide, attending, note });
        setGuests((prevGuests) =>
          prevGuests.map((guest) =>
            guest.id === selectedGuest.id
              ? { ...guest, name, guestSide, attending, note }
              : guest
          )
        );
        console.log("Guest updated successfully");
        alert("Guest info updated");
        setName("");
        setGuestSide("");
        setAttending("");
        setNote("");
        setSelectedGuest(null);
      } catch (error) {
        console.error("Error updating guest:", error);
        alert("Error updating guest");
      }
    } else {
      // Add mode
      // Find the highest existing ID
      const highestId = guests.reduce(
        (maxId, guest) => Math.max(maxId, guest.id),
        0
      );
      const newGuest = {
        id: highestId + 1, // Assign the next ID
        name,
        guestSide,
        attending,
        note,
      };

      try {
        const guestDocRef = doc(db, "guests", String(newGuest.id));
        await setDoc(guestDocRef, newGuest);
        setGuests((prev) => [...prev, newGuest]);
        console.log("Guest added successfully");
        alert("New guest added to the list");
        // Add the new guest to the guests state, ensuring no duplicates
        setGuests((prevGuests) => {
          // Check if the guest is already in the list
          const guestExists = prevGuests.some(
            (guest) => guest.id === newGuest.id
          );
          if (!guestExists) {
            return [...prevGuests, newGuest];
          }
          return prevGuests;
        });
        setName("");
        setGuestSide("");
        setAttending("");
        setNote("");
      } catch (error) {
        console.error("Error adding guest:", error);
        alert("Error adding new guest");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-start items-start gap-4 mt-6"
    >
      <div className="max-sm:w-full sm:min-w-[500px] flex flex-col gap-1">
        <label>Guest Name *</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="max-w-[500px] border  sm:p-2 w-full focus:outline-none focus:ring-0"
        />
      </div>
      <div className="max-sm:w-full sm:min-w-[500px] flex flex-col gap-1">
        <label>Side *</label>
        <select
          value={guestSide}
          onChange={(e) => setGuestSide(e.target.value)}
          required
          className="max-w-[500px] border  sm:p-2 w-full focus:outline-none focus:ring-0"
        >
          <option value="" disabled>
            Select Side
          </option>
          <option value="Emanuele">Emanuele</option>
          <option value="Karolina">Karolina</option>
        </select>
      </div>
      <div className="max-sm:w-full sm:min-w-[500px] flex flex-col gap-1">
        <label>Attending *</label>
        <select
          value={attending}
          onChange={(e) => setAttending(e.target.value)}
          required
          className="max-w-[500px] border  sm:p-2 w-full focus:outline-none focus:ring-0"
        >
          <option value="" disabled>
            Attending?
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      <div className="max-sm:w-full sm:min-w-[500px] flex flex-col gap-1">
        <label>Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)"
          className="max-w-[500px] border  p-2 w-full focus:outline-none focus:ring-0"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-green-900 text-white p-2 font-bold"
      >
        {selectedGuest ? "Update Guest" : "Add Guest"}
      </button>
    </form>
  );
};

const ManageRelationships = ({ guests }) => {
  return <div>manage relationships</div>;
};
