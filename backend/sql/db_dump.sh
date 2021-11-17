#!/bin/bash
#
# Grava o banco local nas fixtures
#

source ./sql/environment

# Dump das tabelas
pg_dump --format=custom --no-comments --inserts \
    --file=$DUMP_FILE

echo "Banco '$PGDATABASE' exportado para o arquivo $DUMP_FILE"
