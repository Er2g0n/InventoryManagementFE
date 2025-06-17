
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Button, Input, Checkbox, Form, Row, Col, RowProps } from "antd";
import { PartnerFormValues, PartnerSchema } from "../types";
import { fieldStatus } from "../utils/FormUtils";
import { z } from "zod";
import { BusinessPartner } from "@/types/BusinessPartner";
import { ParnterDeleteByCode,  PartnerSave } from "../services/partnerServices";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import {
  DeleteFilled
} from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import useFetchData from "../hooks/useFectchData";

export type IPartnerFormProps = RowProps & React.RefAttributes<HTMLDivElement> & {
  readonly type?: "create" | "update",
  defaultValue2?: BusinessPartner,
  afterSave?: (isSave: boolean) => void,
  afterDelete?: (isDelete: boolean) => void
}

const PartnerForm = forwardRef<any, IPartnerFormProps>((
  { type = "create", defaultValue2,
    afterSave = () => { },
    afterDelete = () => { },
    ...attributes }, ref) => {
  const { loading: loadingDelete, fetchData: fetchDataDelete } = useFetchData<boolean>();

  useImperativeHandle(ref, () => ({
  }));
  const form = useForm({
    defaultValues: {
      partnerName: defaultValue2?.partnerName ?? "",
      isSupplier: defaultValue2?.isSupplier ?? false,
      isCustomer: defaultValue2?.isCustomer ?? false,
      contactInfo: defaultValue2?.contactInfo ?? "",
      statusID: defaultValue2?.statusID ?? 0
    },
    validators: {
      onChange: PartnerSchema
    },
    onSubmit: async (e) => {
      try {
        await saveParnter(e.value);


      } catch (error) {
        if (error instanceof Error && "issues" in error) {
          const zodError = error as unknown as z.ZodError;

          zodError.issues.forEach((issue) => {
            const path = issue.path.join(".") as keyof PartnerFormValues;

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
      return await ParnterDeleteByCode(defaultValue2?.partnerCode + "");
    };

    try {

      const result = await fetchDataDelete(promiseDelete);

      afterDelete(!!result);
    } catch (error) {
      console.error(error, "delete errror");
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
      onCancel () {
      }
    });
  };




  useEffect(() => {
    form.reset();

  }, [defaultValue2]);

  async function saveParnter (value: PartnerFormValues): Promise<boolean> {
    const dataSave = {
      partnerName: value.partnerName,
      isSupplier: value.isSupplier,
      isCustomer: value.isCustomer,
      contactInfo: value.contactInfo,
      statusID: value.statusID,
      updatedDate: new Date().toISOString(),
      updatedBy: "tui"
    } as BusinessPartner;

    if (type == "create") {
      dataSave.createdDate = new Date().toISOString();
      dataSave.createdBy = "me";
    } else if (type == "update") {
      if (defaultValue2 && defaultValue2.id) {
        dataSave.id = defaultValue2.id;
        dataSave.createdDate = defaultValue2.createdBy;
        dataSave.createdBy = defaultValue2.createdBy;
        dataSave.rowPointer = defaultValue2.rowPointer;
        dataSave.createdDate = defaultValue2.createdDate;
        dataSave.createdBy = defaultValue2.createdBy;
        dataSave.partnerCode = defaultValue2.partnerCode;
      }
    }
    try {

      await PartnerSave(dataSave);
      afterSave(true);
      if (type == "create"){
        form.reset();
      }
      return true;
    } catch (error) {
      console.error(error, "saveParnter proble");
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
      <Row gutter={[16, 16]} {...attributes} >
        {/* Partner Code */}
        {(type=="update" && defaultValue2?.partnerCode) &&
        <Col xs={24} md={12} >
          
          <Form.Item
            label="Code"
            layout="vertical"
           
            hasFeedback
          >
            <Input
              value={defaultValue2?.partnerCode}
              readOnly
              disabled
              
              className="w-full transition-all duration-300 "
            />
          </Form.Item>
          
        </Col>
        }
        
        

        {/* Partner Name */}
        <Col xs={24} md={12} >
          <form.Field name="partnerName">
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
                  placeholder="Enter partner name"
                  className="w-full transition-all duration-300 "
                />
              </Form.Item>
            )}
          </form.Field>
        </Col>





        {/* Contact Info */}
        <Col xs={24} md={12} >
          <form.Field name="contactInfo">
            {(field) => (
              <Form.Item
                label="Contact Info"
                layout="vertical"
                validateStatus={fieldStatus(field)}
                hasFeedback
                help={<FieldInfo field={field} />}
              >
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Phone / Email / Address"
                  className="w-full transition-all duration-300 "
                />
              </Form.Item>
            )}
          </form.Field>
        </Col>

        {/* Status ID */}
        <Col xs={24} md={12} >
          <form.Field name="statusID">
            {(field) => (
              <Form.Item
                label="Status ID "
                layout="vertical"

                validateStatus={fieldStatus(field)}
                hasFeedback
                help={<FieldInfo field={field} />}
              >
                <Input
                  type="number"
                  min={0}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  placeholder="Enter status ID"
                  className={"w-full transition-all duration-300 "}
                />
              </Form.Item>
            )}
          </form.Field>
        </Col>
        <Col xs={12} md={24}  >
          <div className="w-full flex gap-4 ">

            <form.Field name="isSupplier">
              {(field) => (
                <Form.Item

                  className="w-fit"
                  label="Supplier"
                  hasFeedback
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                    />
                  </label>
                </Form.Item>
              )}
            </form.Field>
            <form.Field name="isCustomer">
              {(field) => (
                <Form.Item
                  className="w-fit"
                  label="Customer"
                  hasFeedback
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                    />
                  </label>
                </Form.Item>
              )}
            </form.Field>
          </div>

        </Col>
        <Col xs={24}
          className=" !flex flex-wrap justify-between gap-1" >
          {(type == "update" && defaultValue2?.partnerCode) &&
            <Form.Item noStyle className="">
              <Button disabled={form.state.isSubmitting} loading={loadingDelete} type="primary" danger={true} icon={<DeleteFilled />}
                onClick={showDeleteConfirm}
                size="large"
                className="md:w-auto w-full" >
                Delete
              </Button>
            </Form.Item>

          }
          {/* Submit button */}
          <Form.Item noStyle className="">
            <Button loading={form.state.isSubmitting} disabled={loadingDelete}  type="primary" htmlType="submit" size="large"
              className="md:w-auto w-full" >
              Save
            </Button>

          </Form.Item>

        </Col>
      </Row>


    </form>
  );
});

function FieldInfo ({ field }: { field: AnyFieldApi }) {
  const status = fieldStatus(field);

  return (
    <>
      {status == "error" ? (
        <em className="text-red-600">{field.state.meta.errors[0]?.message}</em>
      ) : null}
      {field.state.meta.isValidating ? <span className="text-blue-600">Validating...</span> : null}
    </>
  );
}
export default PartnerForm;
