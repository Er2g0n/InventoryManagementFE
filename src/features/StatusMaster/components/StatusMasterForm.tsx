import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Button, Input, Form, Row, Col, RowProps } from "antd";
import { z } from "zod";
import { StatusMaster } from "@/types/StatusMaster";
import { StatusMasterSchema, StatusMasterFormValues } from "../types";
import { fieldStatus } from "../utils/FormUtils";
import { StatusMasterSave, StatusMasterDeleteByCode } from "../services/StatusMasterService";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { DeleteFilled } from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import useFetchData from "../hooks/useFetchData";

export type IStatusMasterFormProps = RowProps & React.RefAttributes<HTMLDivElement> & {
  readonly type?: "create" | "update";
  defaultValue2?: StatusMaster;
  afterSave?: (isSave: boolean) => void;
  afterDelete?: (isDelete: boolean) => void;
};

const StatusMasterForm = forwardRef<any, IStatusMasterFormProps>(
  ({ type = "create", defaultValue2, afterSave = () => {}, afterDelete = () => {}, ...attributes }, ref) => {
    const { loading: loadingDelete, fetchData: fetchDataDelete } = useFetchData<boolean>();

    useImperativeHandle(ref, () => ({}));

    const form = useForm({
      defaultValues: {
        statusName: defaultValue2?.statusName ?? "",
        description: defaultValue2?.description ?? ""
      },
      validators: {
        onChange: StatusMasterSchema
      },
      onSubmit: async (e) => {
        try {
          await saveStatusMaster(e.value);

        } catch (error) {
          if (error instanceof Error && "issues" in error) {
            const zodError = error as unknown as z.ZodError;

            zodError.issues.forEach((issue) => {
              const path = issue.path.join(".") as keyof StatusMasterFormValues;

              form.setFieldMeta(path, (meta) => ({
                ...meta,
                errors: [{ message: issue.message }]
              }));
            });
          }
        }
      }
    });

    async function deleteChoose () {
      const promiseDelete = async (): Promise<boolean> => {
        return await StatusMasterDeleteByCode(defaultValue2?.statusCode + "");
      };

      try {
        const result = await fetchDataDelete(promiseDelete);

        afterDelete(!!result);
        
      } catch (error) {
        console.error("Delete error:", error);
        afterDelete(false);
      }
    }

    function showDeleteConfirm () {
      confirm({
        title: "Are you sure you want to delete this?",
        content: "This action cannot be undone.",
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        async onOk () {
          await deleteChoose();
        },
        onCancel () {}
      });
    }

    useEffect(() => {
      form.reset();
    }, [defaultValue2]);

    async function saveStatusMaster (value: StatusMasterFormValues): Promise<boolean> {
      const dataSave = {
        statusName: value.statusName,
        description: value.description,
        updatedDate: new Date().toISOString(),
        updatedBy: "tui"
      } as StatusMaster;

      if (type === "create") {
        dataSave.createdDate = new Date().toISOString();
        dataSave.createdBy = "me";
      } else if (type === "update") {
        if (defaultValue2 && defaultValue2.id) {
          dataSave.id = defaultValue2.id;
          dataSave.createdDate = defaultValue2.createdDate;
          dataSave.createdBy = defaultValue2.createdBy;
          dataSave.statusCode = defaultValue2.statusCode;
        }
      }

      try {
        await StatusMasterSave(dataSave);
        afterSave(true);
        if (type === "create") {
          form.reset();
        }
        return true;
      } catch (error) {
        console.error(error, "saveStatusMaster problem");
        afterSave(false);
        return false;
      }
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Row gutter={[16, 16]} {...attributes}>
          {/* Status Code */}
          {type === "update" && defaultValue2?.statusCode && (
            <Col xs={24} md={12}>
              <Form.Item label="Code" layout="vertical" hasFeedback>
                <Input
                  value={defaultValue2?.statusCode}
                  readOnly
                  disabled
                  className="w-full transition-all duration-300"
                />
              </Form.Item>
            </Col>
          )}

          {/* Status Name */}
          <Col xs={24} md={12}>
            <form.Field name="statusName">
              {(field) => (
                <Form.Item
                  label="Name"
                  layout="vertical"
                  validateStatus={fieldStatus(field)}
                  hasFeedback
                  help={<FieldInfo field={field} />}
                >
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter status name"
                    className="w-full transition-all duration-300"
                  />
                </Form.Item>
              )}
            </form.Field>
          </Col>

          {/* Description */}
          <Col xs={24} md={12}>
            <form.Field name="description">
              {(field) => (
                <Form.Item
                  label="Description"
                  layout="vertical"
                  validateStatus={fieldStatus(field)}
                  hasFeedback
                  help={<FieldInfo field={field} />}
                >
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter description"
                    className="w-full transition-all duration-300"
                  />
                </Form.Item>
              )}
            </form.Field>
          </Col>

          {/* Submit and Delete Buttons */}
          <Col xs={24} className="!flex flex-wrap justify-between gap-1">
            {type === "update" && defaultValue2?.statusCode && (
              <Form.Item noStyle>
                <Button
                  disabled={form.state.isSubmitting}
                  loading={loadingDelete}
                  type="primary"
                  danger
                  icon={<DeleteFilled />}
                  onClick={showDeleteConfirm}
                  size="large"
                  className="md:w-auto w-full"
                >
                  Delete
                </Button>
              </Form.Item>
            )}
            <Form.Item noStyle>
              <Button
                loading={form.state.isSubmitting}
                disabled={loadingDelete}
                type="primary"
                htmlType="submit"
                size="large"
                className="md:w-auto w-full"
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </form>
    );
  }
);

function FieldInfo ({ field }: { field: AnyFieldApi }) {
  const status = fieldStatus(field);

  return (
    <>
      {status === "error" ? (
        <em className="text-red-600">{field.state.meta.errors[0]?.message}</em>
      ) : null}
      {field.state.meta.isValidating ? <span className="text-blue-600">Validating...</span> : null}
    </>
  );
}

export default StatusMasterForm;