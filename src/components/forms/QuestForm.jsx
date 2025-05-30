import React from "react";
import PropTypes from "prop-types";
import BaseQuestForm from "./BaseQuestForm";

const QuestForm = ({
  quest = {},
  isEdit = false,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <BaseQuestForm
      initialData={quest}
      onSubmit={onSave}
      onCancel={onCancel}
      onDelete={isEdit ? onDelete : undefined}
      submitButtonText={isEdit ? "Update Quest" : "Create Quest"}
      showDeleteButton={isEdit}
      className="quest-form-container"
    />
  );
};

QuestForm.propTypes = {
  quest: PropTypes.object,
  isEdit: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

export default QuestForm;
