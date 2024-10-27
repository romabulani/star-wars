import React, { useCallback, useState } from "react";
import { useStarWars } from "../../store";

interface EditableFieldsProps {
  originalValue: string | number;
  characterUrl: string;
  isGender?: boolean;
}

const EditableFields: React.FC<EditableFieldsProps> = ({
  originalValue,
  characterUrl,
  isGender,
}) => {
  const { setEditedFields, editedFields } = useStarWars();
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState(
    (isGender
      ? editedFields[characterUrl]?.gender
      : editedFields[characterUrl]?.height) ?? originalValue
  );

  const handleReset = () => {
    setState(originalValue)
    setEditedFields(characterUrl, {
      [isGender ? "gender" : "height"]: originalValue,
    });
  };

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = (e?:React.FormEvent) => {
    if(e) {
      e.preventDefault();
    }
    setEditedFields(characterUrl, {
      [isGender ? "gender" : "height"]: state,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-x-2">
      {!isEditing && (
        <span className="text-sm text-gray-500">
          {isGender
            ? `Gender: ${(state as string)?.toUpperCase()}`
            : `Height: ${state} cm`}
        </span>
      )}
      {isEditing && (
        <form onSubmit={handleSave}>
        <input
          type={isGender ? "text" : "number"}
          value={state}
          placeholder={isGender ? "Gender" : "Height"}
          onChange={(e) => setState(e.target.value)}
          className="border border-gray-300 outline-none rounded-md px-2"
        />
        </form>
      )}
      <div className="flex space-x-2 items-center">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-gray-500 text-sm underline"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="text-gray-500 text-sm underline"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleReset}
          className="text-gray-500 text-sm underline"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default EditableFields;
