import Parse from "@/lib/back4app";

export async function checkDomain(url: string) {

  try {

    // valida vazio
    if (!url || url.trim() === "") {

      return {
        error: "Digite um link"
      };

    }

    // remove espaços
    let formattedUrl =
      url
        .trim()
        .replace(/\s/g, "");

    // adiciona https automaticamente
    if (
      !formattedUrl.startsWith("http://")
      &&
      !formattedUrl.startsWith("https://")
    ) {

      formattedUrl =
        `https://${formattedUrl}`;

    }

    // cria objeto URL
    const parsedUrl =
      new URL(formattedUrl);

    // pega domínio
    const domain =
      parsedUrl.hostname
        .replace("www.", "")
        .toLowerCase();

    // consulta Back4App
    const query =
      new Parse.Query(
        "OfficialDomains"
      );

    query.equalTo(
      "domain",
      domain
    );

    // busca
    const result =
      await query.first();

    // domínio oficial
    if (result) {

      return {
        official: true,
        company: result.get("company"),
        domain
      };

    }

    // domínio suspeito
    return {
      official: false,
      domain
    };

  } catch (error) {

    console.log(error);

    return {
      error: "URL inválida"
    };

  }

}