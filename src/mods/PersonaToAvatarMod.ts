import { SourceFile } from "ts-morph";

const personaPath = "office-ui-fabric-react/lib/Persona";

export function AppendNamedImportIfNoExist(
  file: SourceFile,
  moduleSpecifier: string,
  namedImports: string[]
) {
  const found = file.getImportDeclaration(val => {
    if (val.getModuleSpecifierValue() === moduleSpecifier) {
      const currentNamedImports = val.getNamedImports();
      namedImports.forEach(str => {
        if (!currentNamedImports.some(cname => cname.getText() === str)) {
          val.addNamedImport(str);
        }
      });
      return true;
    }
    return false;
  });
  if (!found) {
    file.addImportDeclaration({
      moduleSpecifier,
      namedImports
    });
  }
}

export function ReplacePersonaImport(file: SourceFile) {
  let found = false;
  file.getImportDeclarations().forEach(imp => {
    if (imp.getModuleSpecifierValue() === personaPath) {
      imp.getNamedImports().forEach(val => {
        if (val.getText() === "Persona") {
          found = true;
          val.renameAlias("Avatar");
          val.remove();
        }
      });
    }
  });
  if (found) {
    AppendNamedImportIfNoExist(file, "office-ui-fabric-react/lib/Avatar", [
      "Avatar"
    ]);
  }
}

export function ReplaceIPersonaPropsImport(file: SourceFile) {
  let found = false;
  file.getImportDeclarations().forEach(imp => {
    if (imp.getModuleSpecifierValue() === personaPath) {
      imp.getNamedImports().forEach(val => {
        if (val.getText() === "IPersonaProps") {
          val.renameAlias("AvatarProps");
          val.remove();
          found = true;
        }
      });
    }
  });
  if (found) {
    AppendNamedImportIfNoExist(file, "office-ui-fabric-react/lib/Avatar", [
      "AvatarProps"
    ]);
  }
}

export function ReplacePersonaSizeImport(file: SourceFile) {
  let found = false;
  file.getImportDeclarations().forEach(imp => {
    if (imp.getModuleSpecifierValue() === personaPath) {
      imp.getNamedImports().forEach(val => {
        if (val.getText() === "PersonaSize") {
          found = true;
          val.renameAlias("AvatarSize");
          val.remove();
        }
      });
    }
  });
  if (found) {
    AppendNamedImportIfNoExist(file, "office-ui-fabric-react/lib/Avatar", [
      "AvatarSize"
    ]);
  }
}

export function RenamePersonaProp(file: SourceFile) {

}