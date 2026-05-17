import Parse from "@/lib/back4app";

export async function reportPhone(
  phoneNumber: string,
  description: string
) {

  try {

    // valida telefone
    if (
      !phoneNumber ||
      phoneNumber.trim() === ""
    ) {

      return {
        success: false,
        message: "Digite um telefone"
      };

    }

    // valida descrição
    if (
      !description ||
      description.trim() === ""
    ) {

      return {
        success: false,
        message: "Descreva o golpe"
      };

    }

    // usuário atual
    const currentUser =
      Parse.User.current();

    // verifica login
    if (!currentUser) {

      return {
        success: false,
        message: "Usuário não autenticado"
      };

    }

    // limpa telefone
    const cleanPhone =
      phoneNumber
        .replace(/\s/g, "")
        .replace(/[()-]/g, "");

    // cria classe
    const ReportedPhones =
      Parse.Object.extend(
        "ReportedPhones"
      );

    // novo objeto
    const report =
      new ReportedPhones();

    // campos
    report.set(
      "phoneNumber",
      cleanPhone
    );

    report.set(
      "description",
      description.trim()
    );

    report.set(
      "createdBy",
      currentUser
    );

    report.set(
      "approved",
      false
    );

    report.set(
      "reportCount",
      1
    );

    // salva
    await report.save();

    return {
      success: true,
      message: "Denúncia enviada"
    };

  } catch (error: unknown) {

    console.log(error);

    if (error instanceof Error) {

      return {
        success: false,
        message: error.message
      };

    }

    return {
      success: false,
      message: "Erro ao enviar denúncia"
    };

  }

}