import Parse from "@/lib/back4app";

export async function searchPhone(
  phoneNumber: string
) {

  try {

    // valida
    if (!phoneNumber.trim()) {

      return {
        success: false,
        message: "Digite um telefone"
      };

    }

    // limpa telefone
    const cleanPhone =
      phoneNumber
        .replace(/\s/g, "")
        .replace(/[()-]/g, "");

    // query
    const query =
      new Parse.Query(
        "ReportedPhones"
      );

    // busca telefone
    query.equalTo(
      "phoneNumber",
      cleanPhone
    );

    // mais recentes primeiro
    query.descending(
      "createdAt"
    );

    // busca resultados
    const results =
      await query.find();

    // sem denúncias
    if (results.length === 0) {

      return {
        success: true,
        found: false,
        reports: []
      };

    }

    // transforma dados
    const reports =
      results.map((report) => ({

        id: report.id,

        phoneNumber:
          report.get("phoneNumber"),

        description:
          report.get("description"),

        createdAt:
          report.createdAt

      }));

    return {
      success: true,
      found: true,
      reports
    };

  } catch (error) {

    console.log(error);

    return {
      success: false,
      message: "Erro ao consultar telefone"
    };

  }

}