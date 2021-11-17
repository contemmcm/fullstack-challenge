#!/bin/bash
#
# Restaura o banco local das fixtures
#

source ./sql/environment

. ./sql/db_drop.sh

pg_restore --clean --dbname "$PGDATABASE" --verbose $DUMP_FILE
