import { DATAVIZA } from "@/app/data";

interface PersonData {
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate: string;
  gender: "male" | "female";
  passportNumber: string;
  passportExpiryDate: string;
  entryDate: string;
  exitDate: string;
  citizenship: string;
  tripPurpose: string;
  itinerary: string;
  additionalInfo?: string;
}

export interface VisaApplicationEmailProps {
  citizenship: string;
  vizaType: string;
  peoples: string;
  tourType?: string;
  firstStepPrice: string;
  vizaTypeTwo: string;
  data: PersonData[];
  phone: string;
  email: string;
  preferredContact: "whatsapp" | "telegram" | "email";
}
const getLabelByValues = (value: string) => {
  return DATAVIZA.find((citizenship) => citizenship.id.toString() === value);
};
export const FormTemplate: React.FC<Readonly<VisaApplicationEmailProps>> = ({
  citizenship,
  vizaType,
  peoples,
  tourType,
  firstStepPrice,
  vizaTypeTwo,
  data,
  phone,
  email,
  preferredContact,
}) => {
  // const getLabelByValues = (value: string) => {
  //   return DATAVIZA.find((citizenship) => citizenship.id.toString() === value);
  // };
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "24px",
        border: "1px solid #eaeaea",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ color: "#333", textAlign: "center" }}>
        📬 Новая заявка на визу
      </h2>

      <h3 style={{ marginTop: "20px", color: "#444" }}>Основная информация</h3>
      <table style={{ width: "100%", fontSize: "14px" }}>
        <tbody>
          <tr>
            <td>
              <strong>Гражданство:</strong>
            </td>
            <td>{citizenship}</td>
          </tr>
          <tr>
            <td>
              <strong>Тип визы:</strong>
            </td>
            <td>{vizaType}</td>
          </tr>
          <tr>
            <td>
              <strong>Тип визы 2:</strong>
            </td>
            <td>{vizaTypeTwo}</td>
          </tr>
          <tr>
            <td>
              <strong>Количество человек:</strong>
            </td>
            <td>{peoples}</td>
          </tr>
          {tourType && (
            <tr>
              <td>
                <strong>Тип тура:</strong>
              </td>
              <td>{tourType}</td>
            </tr>
          )}
          <tr>
            <td>
              <strong>Цена первого этапа:</strong>
            </td>
            <td>{firstStepPrice}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "30px", color: "#444" }}>Данные заявителей</h3>
      {data.map((person, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ddd",
          }}
        >
          <p>
            <strong>ФИО:</strong> {person.lastName} {person.firstName}{" "}
            {person.middleName || ""}
          </p>
          <p>
            <strong>Дата рождения:</strong> {person.birthDate}
          </p>
          <p>
            <strong>Пол:</strong>{" "}
            {person.gender === "male" ? "Мужской" : "Женский"}
          </p>
          <p>
            <strong>Номер паспорта:</strong> {person.passportNumber}
          </p>
          <p>
            <strong>Срок действия паспорта:</strong> {person.passportExpiryDate}
          </p>
          <p>
            <strong>Дата въезда:</strong> {person.entryDate}
          </p>
          <p>
            <strong>Дата выезда:</strong> {person.exitDate}
          </p>
          <p>
            <strong>Гражданство:</strong>{" "}
            {getLabelByValues(person.citizenship)?.country || "Нет данных"}
          </p>
          <p>
            <strong>Гражданство:</strong>{" "}
          </p>
          <p>
            <strong>Гражданство:</strong>{" "}
            {getLabelByValues(person.citizenship)?.country || "Нет данных"}
          </p>
          <p>
            <strong>Цель поездки:</strong> {person.tripPurpose}
          </p>
          <p>
            <strong>Маршрут:</strong> {person.itinerary}
          </p>
          {person.additionalInfo && (
            <p>
              <strong>Доп. информация:</strong> {person.additionalInfo}
            </p>
          )}
        </div>
      ))}

      <h3 style={{ marginTop: "30px", color: "#444" }}>
        Контактная информация
      </h3>
      <p>
        <strong>Телефон:</strong> {phone}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Предпочтительный способ связи:</strong> {preferredContact}
      </p>

      <p style={{ marginTop: "30px", fontSize: "14px", color: "#999" }}>
        Письмо сгенерировано автоматически. Пожалуйста, не отвечайте на него.
      </p>
    </div>
  );
};

export const ReadyTemplate: React.FC<
  Readonly<{ name: string; email: string; tel: string }>
> = ({ name, email, tel }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "24px",
      border: "1px solid #eaeaea",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    }}
  >
    <h2 style={{ color: "#333", textAlign: "center" }}>
      📬 Новая заявка на связь
    </h2>
    <p style={{ fontSize: "16px", color: "#555" }}>
      Вы получили новую заявку с сайта. Ниже приведены данные пользователя:
    </p>

    <table
      style={{
        width: "100%",
        marginTop: "20px",
        fontSize: "16px",
        color: "#333",
      }}
    >
      <tbody>
        <tr>
          <td style={{ padding: "8px", fontWeight: "bold", width: "120px" }}>
            Имя:
          </td>
          <td style={{ padding: "8px" }}>{name}</td>
        </tr>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <td style={{ padding: "8px", fontWeight: "bold" }}>Телефон:</td>
          <td style={{ padding: "8px" }}>{tel}</td>
        </tr>
        <tr>
          <td style={{ padding: "8px", fontWeight: "bold" }}>Email:</td>
          <td style={{ padding: "8px" }}>{email}</td>
        </tr>
      </tbody>
    </table>

    <p style={{ marginTop: "30px", fontSize: "14px", color: "#999" }}>
      Письмо сгенерировано автоматически. Пожалуйста, не отвечайте на него.
    </p>
  </div>
);
