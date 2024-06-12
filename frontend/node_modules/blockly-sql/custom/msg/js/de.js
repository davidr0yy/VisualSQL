/**
 * @fileoverview German strings for custom Blocks.
 * @author marcus@marcusleib.com
 */
'use strict';

goog.provide('Blockly.Msg.Custom.de');

goog.require('Blockly.Msg');

Blockly.Msg.Custom["DATAELEMENT_BOOL"] = "Datenelement vom Typ Wahrheitswert";
Blockly.Msg.Custom["DATAELEMENT_STRING"] = "Datenelement vom Typ Text";
Blockly.Msg.Custom["DATAELEMENT_NUMBER"] = "Datenelement vom Typ Zahl";
Blockly.Msg.Custom["DATAELEMENT_DATE"] = "Datenelement vom Typ Datum";
Blockly.Msg.Custom["DATAELEMENT_DATETIME"] = "Datenelement vom Typ Datum mit Uhrzeit";
Blockly.Msg.Custom["ENTITY_TABLE"] = "Auswahl der betroffenen Tabelle";
Blockly.Msg.Custom["ENTITY_COLUMN"] = "Auswahl der betroffenen Spalte";
Blockly.Msg.Custom["BLOCK_CONDITION"] = "Dieser Block erzeugt einen Vergleich\nLIKE: Ermöglicht den Vergleich mit einem Regulären Ausdruck\nIN: Prüft ob der angebgene Wert in der gegebenen Menge an Werten existiert (Die Menge kann durch einen SELECT Befehl definiert werden)";
Blockly.Msg.Custom["BLOCK_CONDITION_NOT"] = "Negiert die folgende Aussage";
Blockly.Msg.Custom["BLOCK_CONDITION_OR"] = "Verbindet zwei Aussagen mit einem logischen ODER";
Blockly.Msg.Custom["BLOCK_CONDITION_AND"] = "Verbindet zwei Aussagen mit einem logischen UND";
Blockly.Msg.Custom["BLOCK_COLUMNDEFINITION"] = "Beschreibt eine neue Spalte\nNeben Name und Typ, können die notwendigen Bedingungen angepasst werden.";
Blockly.Msg.Custom["BLOCK_UPDATE"] = "Dieser Block erzeugt einen UPDATE-Befehl.\nDurch Einsatz eines WHERE Blocks kann das Befehl eingeschränkt werden.";
Blockly.Msg.Custom["BLOCK_UPDATE_WHERE"] = "Dieser Block schränkt den Wirkungsbereich des zugeordneten UPDATE Blocks ein.";
Blockly.Msg.Custom["BLOCK_UPDATE_COLUMNTOVALUE"] = "Zuordnung von Spaltenname zum neuen Wert dieser Spalte.\nDurch Einsatz eines WHERE Blocks kann das Befehl eingeschränkt werden.";
Blockly.Msg.Custom["BLOCK_SELECT"] = "Dieser Block erzeugt einen SELECT-Befehl.\nDurch Einsatz der verschiedenen Modifizierer kann der Befehl an unterschiedliche Bedingungnen angepasst werden.";
Blockly.Msg.Custom["BLOCK_SELECT_JOIN"] = "Modifiziert den SELECT-Befehl und ergänzt hierbei die Verknüpfung mit anderen Tabellen mittels eines JOINS.";
Blockly.Msg.Custom["BLOCK_SELECT_WHERE"] = "Modifiziert den SELECT-Befehl und schränkt die Rückgabe ein.\nDie Rückgabe erfüllt die hier festgelegten Bedingungen.";
Blockly.Msg.Custom["BLOCK_SELECT_GROUP"] = "Modifiziert den SELECT-Befehl und gruppiert die Rückgabe entsprechend der gewählten Spalte.";
Blockly.Msg.Custom["BLOCK_SELECT_GROUP_HAVING"] = "Modifiziert den SELECT-Befehl und insbesondere den GROUP BY-Befehl. Die Bedingung schränkt die gruppierte Datenmenge ein.";
Blockly.Msg.Custom["BLOCK_SELECT_ORDER"] = "Modifiziert den SELECT-Befehl und sortiert die Rückgabe.";
Blockly.Msg.Custom["BLOCK_SELECT_LIMIT"] = "Modifiziert den SELECT-Befehl und limitiert die Anzahl der zurückgegebenen Zeilen.";
Blockly.Msg.Custom["BLOCK_INSERT"] = "Dieser Block erzeugt einen INSERT-Befehl.\nDadurch können der angegebenen Tabelle neue Einträge hinzugefügt werden.";
Blockly.Msg.Custom["BLOCK_DROP"] = "Dieser Block erzeugt einen DROP-Befehl.\nDie angegebenen Tabelle wird ohne weitere Nachfragen unwiederruflich entfernt.";
Blockly.Msg.Custom["BLOCK_CREATE"] = "Dieser Block erzeugt einen CREATE-Befehl.\nDadurch kann eine neue Tabelle angelegt werden.";
Blockly.Msg.Custom["BLOCK_ALTER"] = "Dieser Block erzeugt einen ALTER-Befehl.\nDadurch kann die Struktur oder der Name einer Tabelle verändert werden.";
Blockly.Msg.Custom["BLOCK_ALTER_RENAME"] = "Modifiziert den ALTER-Befehl und ändert den Namen der ausgewhlten Tabelle.";
Blockly.Msg.Custom["BLOCK_ALTER_RENAME_COLUMN"] = "Modifiziert den ALTER-Befehl und ändert den Namen einer Spalte.";
Blockly.Msg.Custom["BLOCK_ALTER_ADD_COLUMN"] = "Modifiziert den ALTER-Befehl und fügt der angegebenen Tabelle eine neue Spalte hinzu.";